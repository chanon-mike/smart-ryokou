import { randomBytes } from 'crypto';

import SessionClient from '@/client/service/session/implement';
import type Session from '@/server/service/database/session/model';

/**
 * Generates a unique ObjectId.
 *
 * @returns {string} The generated ObjectId.
 */
export const generateObjectId = () => {
  // Generate a 4-byte timestamp
  const timestamp = Math.floor(new Date().getTime() / 1000)
    .toString(16)
    .padStart(8, '0');

  // Generate a 5-byte random value
  const random = randomBytes(5).toString('hex');

  // Generate a 3-byte incrementing counter
  const counter = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0');

  const objectId = `${timestamp}${random}${counter}`;

  return objectId;
};

/**
 * Saves new session data.
 * @param session The session object to be saved.
 */
export const saveNewSessionData = (session: Session) => {
  const client = new SessionClient();
  client.update(session);
};
