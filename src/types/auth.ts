import type { LoginResponse } from './api';

export type TAuthentication = {
  isAuthenticated: boolean;
};

export interface AuthState extends TAuthentication {
  user: LoginResponse | null;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}
