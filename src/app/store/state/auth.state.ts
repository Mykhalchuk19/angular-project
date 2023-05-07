import { Action, Actions, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  GetMe,
  Login, SetAuthLoading,
} from '../actions/auth.actions';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LoginFormValues, LoginResponse, UserEntity } from '../../shared/types';
import { Storage } from '../../shared/helpers';

export class AuthStateModel {
  token?: string;

  user?: UserEntity;

  loading: boolean;
}

@State<AuthStateModel>( {
  name: 'auth',
} )

@Injectable()
export class AuthState {

  @Selector()
  static token( state: AuthStateModel ) {
    return state.token;
  }

  @Selector()
  static loading( state: AuthStateModel ) {
    return state.loading;
  }

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private store: Store,
    private actions$: Actions,
  ) {
  }

  @Action( Login )
  login( { patchState }: StateContext<AuthStateModel>, { payload }: { payload: LoginFormValues } ) {
    return this.userService.login(payload).pipe(
      tap((data: LoginResponse) => {
        patchState({ token: data.accessToken });
        Storage.setTokenToStorage(data.accessToken);
      }, error => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      }),
    );
  }

  @Action(GetMe)
  getMe({ patchState }: StateContext<AuthStateModel>) {
    return this.userService.getMe().pipe(
      tap((data: UserEntity) => {
        patchState({ user: { ...data } });
      }, error => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      }),
    );
  }

  // @Action( Register )
  // register( {patchState}: StateContext<AuthStateModel>, {payload} ) {
  //   if (payload.user) {
  //     payload.user = {
  //       ...payload.user,
  //       email: payload.user.email && payload.user.email.toLowerCase()
  //     };
  //   } else {
  //     payload = {
  //       ...payload,
  //       email: payload.email && payload.email.toLowerCase()
  //     };
  //   }
  //   return this.userService.register( payload ).pipe( tap( ( data ) => {
  //       // this.zone.run(() => {
  //       //     this.router.navigate(['/']);
  //       // })
  //     },
  //     error => {
  //       if ( error.error.error === 'User with this email already exists in database' ) {
  //         return;
  //       }
  //       this.snackBar.open( error.error.error, '', {
  //         duration: 3000,
  //       } );
  //     }
  //   ) );
  // }

  // @Action( ChangePassword )
  // changePassword( {patchState}: StateContext<AuthStateModel>, {payload} ) {
  //   return this.userService.changePassword( payload ).pipe( tap( ( data ) => {
  //       this.zone.run( () => {
  //         if ( data.type && data.type === 'forgot' ) {
  //           this.router.navigate( ['/'] );
  //         }
  //         this.translateService.get('INFO_MESSAGES.PASSWORD_CHANGED').subscribe(message => {
  //           this.snackBar.open(message);
  //         });
  //       } );
  //     },
  //     error => {
  //       this.snackBar.open( error.error.error, '', {
  //         duration: 3000,
  //       } );
  //     }
  //   ) );
  // }
  //
  // @Action( ChangeForgottenPassword )
  // changeForgottenPassword( {patchState}: StateContext<AuthStateModel>, {payload} ) {
  //   return this.userService.changeForgottenPassword( payload ).pipe( tap( ( data ) => {
  //       this.zone.run( () => {
  //         this.router.navigate( ['/feed'] );
  //         this.translateService.get('INFO_MESSAGES.PASSWORD_CHANGED').subscribe(message => {
  //           this.snackBar.open(message);
  //         });
  //       } );
  //     },
  //     error => {
  //       this.snackBar.open( error.error.error, '', {
  //         duration: 3000,
  //       } );
  //     }
  //   ) );
  // }

  // @Action( Logout )
  // logout( {setState, dispatch}: StateContext<AuthStateModel> ) {
  //   setState( {} );
  //
  //   localStorage.removeItem(TOKEN_STORAGE_KEY);
  //   localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
  //
  //   return dispatch(new ResetLoggedInUserStore()).pipe(
  //     tap(() => {
  //       this.router.navigate(['/']);
  //     })
  //   );
  // }

  @Action( SetAuthLoading )
  setAuthLoading( { patchState }: StateContext<AuthStateModel>, { loading }: { loading: boolean }) {
    patchState({ loading });
  }
}
