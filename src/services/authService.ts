import { fakeLogin, fakeLogout } from "../backend/auth";
import type { LoginResponse } from "../types";

export async function userLogin(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fakeLogin(username, password);
  return response;
}

export async function userLogout(): Promise<boolean> {
  const response = await fakeLogout();
  return response;
}
