import type { LoginResponse } from '../types';
import { isNetworkError, NETWORK_ERROR, networkDelay} from "../constants"

export const fakeLogin = (
  username: string,
  password: string
): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      if (isNetworkError) {
        reject(new Error(NETWORK_ERROR));
        return;
      }
      if (username === "admin" && password === "pwd123") {
        resolve({
          success: true,
          user: {
            username,
            token: "fake-jwt-token",
          },
        });
      } else {
        resolve({
          success: false,
          error: "Invalid username or password",
        });
      }
    }, networkDelay);
  });
};

export const fakeLogout = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isNetworkError) {
        reject(new Error(NETWORK_ERROR));
        return;
      }
      resolve(true); 
    }, networkDelay);
  });
};