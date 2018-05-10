export const payment = () =>
  new Promise(resolve => {
    setTimeout(resolve, 2500);
  });

export const session = value =>
  fetch('/session', {
    method: 'POST',
    body: JSON.stringify(value),
    headers: {
      'Content-type': 'application/json',
    },
  }).then(response => {
    return response.json();
  });
