import { InviteUserValues, ListResponse, QueryParams, UsersList } from '../../shared/types';
import { Action, Actions, Selector, State, StateContext, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { FetchUsers, InviteUser, SetUsersLoading } from '../actions/users.actions';
import { tap } from 'rxjs';

export class UsersStateModel {
  list: ListResponse<UsersList>;

  loading: boolean;

}

@State<UsersStateModel>( {
  name: 'users',
} )

@Injectable()
export class UsersState {


  @Selector()
  static usersList( state: UsersStateModel ) {
    return state.list;
  }

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private store: Store,
    private actions$: Actions,
  ) {
  }

  @Action( SetUsersLoading )
  setUsersLoading( { patchState }: StateContext<UsersStateModel>, { loading }: { loading: boolean }) {
    patchState({ loading });
  }

  @Action(FetchUsers)
  fetchUsers({ patchState }: StateContext<UsersStateModel>, { payload }: { payload: QueryParams }) {
    return this.usersService.fetchUsers(payload).pipe(tap({
      next: (data: ListResponse<UsersList>) => {
        patchState({
          list: {
            ...data,
          },
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      },
    }));
  }

  @Action(InviteUser)
  inviteUser(_: StateContext<UsersStateModel>, { payload }: { payload: InviteUserValues }) {
    return this.usersService.inviteUser(payload).pipe(tap({
      next: () => {
        this.snackBar.open('User was invited', '', {
          duration: 3000,
        });
      },
      error:  (error) => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      },
    }));
  }
}
