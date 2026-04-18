import type { LoginResponse } from "../types";
import {
  NETWORK_DELAY,
  SAMPLE_USER_USERNAME,
  SAMPLE_USER_PASSWORD,
  LOGIN_ERROR_MESSAGE,
} from "../constants";
import { delay } from "../utils";

export const fakeLogin = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  await delay(NETWORK_DELAY);
  return new Promise((resolve) => {
    if (
      username === SAMPLE_USER_USERNAME &&
      password === SAMPLE_USER_PASSWORD
    ) {
      resolve({
        success: true,
        user: {
          id: crypto.randomUUID(),
          username,
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
