import { UserRoleEnum } from './user';
import { StatusEnum } from './common';

export type LoginFormValues = {
  email: string,
  password: string,
};


export type LoginResponse = {
  accessToken: string;
};

export type ForgotPasswordFormValues = {
  email: string,
};

export enum TokenType {
  INVITATION,
  RESET,
}

export type CheckTokenValues = {
  token: string,
  type: TokenType
};

export type ChangePasswordFormValues = {
  password: string,
  repeatPassword: string,
};

export type ResetPasswordValues = {
  password: string,
  token: string
};

export type ResetPasswordFormValues = Pick<ResetPasswordValues, 'password'>;

export type ProfileFormValues = {
  name: string,
  surname: string,
  email: string,
  phone: string,
};

export type AvatarResponse = {
  id: string,
  fileName: string
};

export type ProfileResponse = {
  createdAt: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  role: UserRoleEnum,
  status: StatusEnum,
  surname: string,
  updatedAt: string,
  username: string,
  avatar: AvatarResponse | null
};
