import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ROUTES } from '../shared/constants/api.routes';
import { LoginFormValues } from '../shared/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) { }

  login(data: LoginFormValues): Observable<any> {
    return this.apiService.post<LoginFormValues>(API_ROUTES.AUTH.LOGIN, data);
  }

}
