import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ROUTES } from '../shared/constants/api.routes';
import { ForgotPasswordFormValues, LoginFormValues, LoginResponse, UserEntity } from '../shared/types';
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
}
