import { Action, Actions, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  Login,
  // SetAuthLoading,
} from '../actions/auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone, Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { LoginFormValues } from '../../shared/types';

export class AuthStateModel {
  token?: string;

  user?: string;

  loading?: boolean;
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
    private router: Router,
    private snackBar: MatSnackBar,
    private zone: NgZone,
    private store: Store,
    private actions$: Actions,
  ) {
  }

  @Action( Login )
  login( { patchState }: StateContext<AuthStateModel>, { payload }: { payload: LoginFormValues } ) {
    console.log(patchState);
    return this.userService.login(payload).pipe(
      tap((data) => {
        console.log(data);
        // patchState({ token, user, refreshToken });
        // localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, JSON.stringify(refreshToken));
      }, error => {
        console.log( error );
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

  // @Action( SetAuthLoading )
  // setAuthLoading( { patchState }: StateContext<AuthStateModel>, { loading }) {
  //   patchState({ loading });
  // }
}
