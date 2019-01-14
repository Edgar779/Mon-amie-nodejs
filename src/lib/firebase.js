import * as admin from 'firebase-admin';

export const initFirebase = () => {
  const serviceAccount = require('../config/google-services.json');
  process.env.PROJECT_ID = serviceAccount.project_id;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://monamie-c38dc.firebaseio.com",
  });

};

export function sendPush(notification, token) {
  return admin.messaging().send({ notification, token });
}
