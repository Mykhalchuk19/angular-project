import {CheckTokenValues, ForgotPasswordFormValues, LoginFormValues, ResetPasswordFormValues} from '../../shared/types';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload:LoginFormValues) { }
}

export class SetAuthLoading {
  static readonly type = '[Auth] SetAuthLoading';

  constructor(public loading: boolean) { }
}

export class GetMe {
  static readonly type = '[Auth] GetMe';
}

export class ForgotPassword {
  static readonly type = '[Auth] ForgotPassword';

  constructor(public payload: ForgotPasswordFormValues) {
  }
}

export class CheckToken {
  static readonly type = '[Auth] CheckToken';

  constructor(public payload: CheckTokenValues) {
  }
}

export class ResetPassword {
  static readonly type = '[Auth] ResetPassword';

  constructor(public payload: ResetPasswordFormValues) {
  }
}
