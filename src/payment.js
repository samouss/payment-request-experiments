import { v4 } from 'uuid';

const standardShippingPrice = 10;
const droneShippingPrice = 25;

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

const format = x => x.toFixed(2);

export const createRequest = product => {
  const details = {
    id: v4(),
    total: {
      label: 'Total amount',
      amount: {
        currency: 'USD',
        value: format(product.price + standardShippingPrice),
        price: product.price + standardShippingPrice,
      },
    },
    displayItems: [
      {
        label: product.name,
        amount: {
          currency: 'USD',
          value: format(product.price),
          price: product.price,
        },
      },
    ],
    shippingOptions: [
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
    ],
  };

  const request = new window.PaymentRequest(providers, details, {
    requestShipping: true,
  });

  request.addEventListener('shippingoptionchange', event => {
    const request = event.currentTarget;

    const shippingOption = details.shippingOptions.find(
      option => option.id === request.shippingOption
    );

    const nextShippingOptions = details.shippingOptions.map(option => ({
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
          value: format(product.price + shippingOption.amount.price),
        },
      },
    });
  });

  return request;
};
