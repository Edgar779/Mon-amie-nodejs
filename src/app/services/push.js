import * as admin from 'firebase-admin';
import { createNotification } from '../../lib/utils';

export const sendPush = registrationToken => {
  const message = createNotification(registrationToken);
  return admin.messaging().send(message);
};
