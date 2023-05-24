import { ListResponse, UsersList } from '../../shared/types';
import { State } from '@ngxs/store';
import { Injectable } from '@angular/core';

export class UsersStateModel {
  list: ListResponse<UsersList>;

  loading: boolean;

}

@State<UsersStateModel>( {
  name: 'users',
} )

@Injectable()
export class UsersState {

}
