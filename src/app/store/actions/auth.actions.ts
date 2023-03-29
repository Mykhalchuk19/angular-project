import { LoginFormValues } from '../../shared/types';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload:LoginFormValues) { }
}

export class SetAuthLoading {
  static readonly type = '[Auth] SetAuthLoading';

  constructor(public loading: boolean) { }
}
