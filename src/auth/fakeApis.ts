import type { LoginResponse } from '../types';
import { NETWORK_DELAY, USERNAME, PASSWORD, TOKEN, LOGIN_ERROR_MESSAGE } from "../constants"
import { delay  } from '../utils';

export const fakeLogin = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  await delay(NETWORK_DELAY);
  return new Promise((resolve) => {
    if (username === USERNAME && password === PASSWORD) {
      resolve({
        success: true,
        user: {
          username,
          token: TOKEN,
        },
      });
    } else {
      resolve({
        success: false,
        error: LOGIN_ERROR_MESSAGE,
      });
    }
  });
};

export const fakeLogout = async (): Promise<boolean> => {
  await delay(NETWORK_DELAY);
  return new Promise((resolve) => {
    resolve(true); 
  });
};