import { QueryParams } from '../../shared/types';

export class FetchUsers {
  static readonly type = '[Users] FetchUsers';

  constructor(public payload: QueryParams) {
  }
}

export class SetUsersLoading {
  static readonly type = '[Users] SetUsersLoading';

  constructor(public loading: boolean) {
  }
}
