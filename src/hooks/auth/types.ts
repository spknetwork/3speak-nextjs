import { AxiosRequestConfig } from "axios";

export interface Authenticator {
  login(...args: any[]): Promise<AuthInfo>;
  logout?(): void | Promise<void>;
}

export type AuthInfo = {
  request: AxiosRequestConfig<any>;
  userId: string;
};
