import {
  CheckTokenValues,
  ForgotPasswordFormValues,
  LoginFormValues,
  ChangePasswordFormValues,
  ResetPasswordValues,
  ProfileFormValues, UpdateAvatarValues,
} from '../../shared/types';

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

export class ChangePassword {
  static readonly type = '[Auth] ChangePassword';

  constructor(public payload: ChangePasswordFormValues) {
  }
}

export class ResetPassword {
  static readonly type = '[Auth] ResetPassword';

  constructor(public payload: ResetPasswordValues) {
  }
}

export class LogOut {
  static readonly type = '[Auth] LogOut';
}

export class UpdateProfile {
  static readonly type = '[Auth] UpdateProfile';

  constructor(public payload: ProfileFormValues) {
  }
}

export class UploadAvatar {
  static readonly type = '[Auth] UploadAvatar';

  constructor(public payload: File) {
  }
}

export class ChangeAvatar {
  static readonly type = '[Auth] ChangeAvatar';

  constructor(public payload: UpdateAvatarValues) {
  }
}

export class RemoveAvatar {
  static readonly type = '[Auth] RemoveAvatar';
}
