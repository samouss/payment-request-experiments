import { v4 } from 'uuid';

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

export const createRequest = product => {
  const details = {
    id: v4(),
    total: {
      label: 'Total amount',
      amount: {
        currency: 'USD',
        value: product.price.toFixed(2),
      },
    },
    displayItems: [
      {
        label: product.name,
        amount: {
          currency: 'USD',
          value: product.price.toString(),
        },
      },
    ],
  };

  return new window.PaymentRequest(providers, details);
};
