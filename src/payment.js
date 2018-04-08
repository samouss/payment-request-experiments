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

const standardShippingPrice = 10;
const droneShippingPrice = 25;

const shippingOptions = [
  {
    id: 'standard',
    label: '🚚 Ground Shipping (2 days)',
    amount: {
      currency: 'USD',
      value: format(standardShippingPrice),
      price: standardShippingPrice,
    },
    selected: true,
  },
  {
    id: 'drone',
    label: '🚁 Drone Express (2 hours)',
    amount: {
      currency: 'USD',
      value: format(droneShippingPrice),
      price: droneShippingPrice,
    },
    selected: false,
  },
];

export const createRequest = products => {
  const amount = products.reduce((acc, product) => acc + product.price, 0);

  const total = {
    label: 'Total amount',
    amount: {
      currency: 'USD',
      value: format(amount + standardShippingPrice),
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

  request.addEventListener('shippingoptionchange', event => {
    const request = event.currentTarget;

    const shippingOption = shippingOptions.find(
      option => option.id === request.shippingOption
    );

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
          value: format(amount + parseFloat(shippingOption.amount.value)),
        },
      },
    });
  });

  return request;
};
