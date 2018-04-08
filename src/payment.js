import { v4 } from 'uuid';

const format = x => x.toFixed(2);

// Credit card (see: https://developer.mozilla.org/en-US/docs/Web/API/BasicCardRequest)
// Apple Pay (see: https://webkit.org/blog/8182/introducing-the-payment-request-api-for-apple-pay)
// Google Pay (see: https://developers.google.com/pay/api/web/paymentrequest/tutorial)
const providers = [
  {
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['mastercard', 'visa'],
      supportedTypes: ['credit', 'debit'],
    },
  },
];

const shippingOptions = [
  {
    id: 'standard',
    label: '🚚 Ground Shipping (2 days)',
    amount: {
      currency: 'USD',
      value: '10.00',
    },
    selected: true,
  },
  {
    id: 'drone',
    label: '🚁 Drone Express (2 hours)',
    amount: {
      currency: 'USD',
      value: '25.00',
    },
    selected: false,
  },
];

const onShippingOptionChange = ({ details, totalAmount }) => event => {
  const request = event.currentTarget;

  const shippingOption = shippingOptions.find(
    option => option.id === request.shippingOption
  );

  const totalAmountWithShipping =
    totalAmount + parseFloat(shippingOption.amount.value);

  const nextShippingOptions = shippingOptions.map(option => ({
    ...option,
    selected: option.id === request.shippingOption,
  }));

  event.updateWith({
    ...details,
    shippingOptions: nextShippingOptions,
    total: {
      label: 'Total amount',
      amount: {
        currency: 'USD',
        value: format(totalAmountWithShipping),
      },
    },
  });
};

export const createRequest = products => {
  const [defaultShippingOption] = shippingOptions;
  const totalAmount = products.reduce((acc, product) => acc + product.price, 0);
  const totalAmountWithShipping =
    totalAmount + parseFloat(defaultShippingOption.amount.value);

  const total = {
    label: 'Total amount',
    amount: {
      currency: 'USD',
      value: format(totalAmountWithShipping),
    },
  };

  const displayItems = products.map(product => ({
    label: product.name,
    amount: {
      currency: 'USD',
      value: format(product.price),
    },
  }));

  const details = {
    id: v4(),
    total,
    displayItems,
    shippingOptions,
  };

  const request = new window.PaymentRequest(providers, details, {
    requestShipping: true,
  });

  request.addEventListener(
    'shippingoptionchange',
    onShippingOptionChange({
      details,
      totalAmount,
    })
  );

  return request;
};
