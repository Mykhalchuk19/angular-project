import { Action, Actions, Selector, State, StateContext, Store } from '@ngxs/store';
import {
  ChangeAvatar,
  ChangePassword,
  CheckToken,
  ForgotPassword,
  GetMe,
  Login, LogOut, RemoveAvatar, ResetPassword, SetAuthLoading, UpdateProfile, UploadAvatar,
} from '../actions/auth.actions';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone, Injectable } from '@angular/core';
import { UserService } from '../../services/user.service';
import {
  Avatar,
  ChangePasswordFormValues,
  CheckTokenValues, FileData,
  ForgotPasswordFormValues,
  LoginFormValues,
  LoginResponse, ProfileFormValues, ProfileResponse, ResetPasswordValues, UpdateAvatarValues,
  UserEntity,
} from '../../shared/types';
import { getFileUrl, Storage } from '../../shared/helpers';
import { FileService } from '../../services/file.service';

export class AuthStateModel {
  token?: string;

  user: UserEntity;

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

  @Selector()
  static getFullName( state: AuthStateModel ) {
    return `${state.user?.name ?? ''}${' '}${state.user?.surname}`;
  }

  @Selector()
  static getAvatarUrl( state: AuthStateModel ) {
    return  state.user?.avatar ? getFileUrl(state.user.avatar.fileName) : undefined;
  }

  @Selector()
  static getCurrentUser( state: AuthStateModel ) {
    return state.user;
  }

  constructor(
    private userService: UserService,
    private fileService: FileService,
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

  @Action(ForgotPassword)
  forgotPassword(_: StateContext<AuthStateModel>, { payload }: { payload: ForgotPasswordFormValues }) {
    return this.userService.forgotPassword(payload).pipe(
      tap(() => {
      }, error => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      }),
    );
  }

  @Action(CheckToken)
  checkToken(_: StateContext<AuthStateModel>, { payload }: { payload: CheckTokenValues }) {
    return this.userService.checkToken(payload).pipe(
      tap(() => {
      }, error => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      }),
    );
  }

  @Action(ChangePassword)
  changePassword(_: StateContext<AuthStateModel>, { payload }: { payload: ChangePasswordFormValues }) {
    return this.userService.changePassword(payload).pipe(
      tap({
        next: () => {
          this.snackBar.open('Password was changed', '', {
            duration: 3000,
          });
        },
        error: error => {
          this.snackBar.open(error.error.message, '', {
            duration: 3000,
          });
        },
      }),
    );
  }

  @Action(ResetPassword)
  resetPassword(_: StateContext<AuthStateModel>, { payload }: { payload: ResetPasswordValues }) {
    return this.userService.resetPassword(payload).pipe(
      tap(() => {
      }, error => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      }),
    );
  }

  @Action(LogOut)
  logOut() {
    this.store.reset({});
    Storage.removeTokenFromStorage();
  }

  @Action(UpdateProfile)
  updateProfile( { patchState, getState }: StateContext<AuthStateModel>, { payload }: { payload: ProfileFormValues } ) {
    const state = getState();
    return this.userService.updateProfile(payload).pipe(
      tap({
        next: (data: ProfileResponse) => {
          patchState({ user: {
            ...state.user,
            name: data.name,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
          } });
          this.snackBar.open('Profile was updated', '', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message, '', {
            duration: 3000,
          });
        },
      }));
  }

  @Action(UploadAvatar)
  uploadAvatar(_: StateContext<AuthStateModel>, { payload }: { payload: File } ) {

    return this.fileService.uploadFile(payload).pipe( tap({
      next: (data: FileData) => {
        this.store.dispatch(new ChangeAvatar({ fileId: data.id }));
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
        });
      },
    }));
  }

  @Action(ChangeAvatar)
  changeAvatar( { patchState, getState }: StateContext<AuthStateModel>, { payload }: { payload: UpdateAvatarValues } ) {
    const state = getState();
    return this.userService.changeAvatar(payload).pipe(
      tap({
        next: (data: Avatar) => {
          patchState({ user: {
            ...state.user,
            avatar: { ...data },
          } });
          this.snackBar.open('Avatar was uploaded', '', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message, '', {
            duration: 3000,
          });
        },
      }));
  }

  @Action(RemoveAvatar)
  removeAvatar({ patchState, getState }: StateContext<AuthStateModel> ) {
    const state = getState();
    return this.userService.removeAvatar().pipe(
      tap({
        next: () => {
          patchState({ user: {
            ...state.user,
            avatar: null,
          } });
          this.snackBar.open('Avatar was removed', '', {
            duration: 3000,
          });
        },
        error: (error) => {
          this.snackBar.open(error.error.message, '', {
            duration: 3000,
          });
        },
      }));

  }

  @Action( SetAuthLoading )
  setAuthLoading( { patchState }: StateContext<AuthStateModel>, { loading }: { loading: boolean }) {
    patchState({ loading });
  }
}
