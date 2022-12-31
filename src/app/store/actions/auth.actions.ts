import { LoginFormValues } from '../../shared/types';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public payload:LoginFormValues) { }
}
