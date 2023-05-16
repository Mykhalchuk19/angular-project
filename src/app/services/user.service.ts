import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ROUTES } from '../shared/constants/api.routes';
import {
  ChangePasswordFormValues,
  CheckTokenValues,
  ForgotPasswordFormValues,
  LoginFormValues,
  LoginResponse, ProfileFormValues, ProfileResponse, ResetPasswordValues,
  UserEntity,
} from '../shared/types';
import { CommonResponse } from '../shared/types/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }

  login(data: LoginFormValues): Observable<LoginResponse> {
    return this.apiService.post<LoginFormValues, LoginResponse>(API_ROUTES.AUTH.LOGIN, data);
  }

  getMe(): Observable<UserEntity> {
    return this.apiService.get(API_ROUTES.USERS.PROFILE);
  }

  forgotPassword(data: ForgotPasswordFormValues): Observable<CommonResponse> {
    return this.apiService.post<ForgotPasswordFormValues, CommonResponse>(API_ROUTES.AUTH.FORGOT_PASSWORD, data);
  }

  checkToken(params: CheckTokenValues): Observable<CommonResponse> {
    return this.apiService.get<CommonResponse>(API_ROUTES.AUTH.CHECK_TOKEN, params);
  }

  changePassword(data: ChangePasswordFormValues): Observable<CommonResponse> {
    return this.apiService.put<ChangePasswordFormValues, CommonResponse>(API_ROUTES.AUTH.CHANGE_PASSWORD, data);
  }

  resetPassword(data: ResetPasswordValues): Observable<CommonResponse> {
    return this.apiService.post<ResetPasswordValues, CommonResponse>(API_ROUTES.AUTH.RESET_PASSWORD, data);
  }

  updateProfile(data: ProfileFormValues): Observable<ProfileResponse> {
    return this.apiService.put<ProfileFormValues, ProfileResponse>(API_ROUTES.USERS.PROFILE, data);
  }
}
