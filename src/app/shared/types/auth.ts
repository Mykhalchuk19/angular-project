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
