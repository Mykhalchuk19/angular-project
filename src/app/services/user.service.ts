import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ROUTES } from '../shared/constants/api.routes';
import { LoginFormValues, LoginResponse, UserEntity } from '../shared/types';

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

}
