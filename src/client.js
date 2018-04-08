const processPaymentOnServer = request =>
  new Promise(resolve => {
    setTimeout(resolve, 2500);
  });

export default processPaymentOnServer;
