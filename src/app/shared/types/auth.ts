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

export type ResetPasswordFormValues = {
  password: string,
  repeatPassword: string,
}
