const soap = require('strong-soap').soap;
import { hashCode } from 'lib/utils';
const getClient = (url, options) => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, options, function(err, client) {
      if (err) return reject(err);
      resolve(client);
    });
  });
};

export async function getPayment(id, price) {
  const url = process.env.PAYMENT_URL;
  const params = {
    paymentfields: {
      ClientID: process.env.PAYMENT_CLIENT_ID,
      Username: process.env.PAYMENT_USERNAME,
      Password: process.env.PAYMENT_PASSWORD,
      OrderID: hashCode(id),
      Description: 'Description',
      PaymentAmount: price,
      backURL: process.env.PAYMENT_BACK_URL
    }
  };

  const options = {};

  let client;
  try {
    client = await getClient(url, options);
  } catch (err) {
    return err;
  }

  return client.GetPaymentID(params);
}

export async function confirmPayment(data) {
  let client;
  try {
    client = await getClient(process.env.PAYMENT_URL, {});
  } catch (err) {
    return err;
  }

  return client.GetPaymentFields(data);
}
