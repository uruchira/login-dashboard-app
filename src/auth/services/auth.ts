import { fakeLogin, fakeLogout } from "../fakeApis";
import type { LoginResponse } from '../../types';

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fakeLogin(username, password);
  return response;
}

export async function logout(): Promise<void> {
  const response = await fakeLogout();
  return response;
}