import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {
  UsersList,
  ListResponse,
  QueryParams,
  QueryId,
  UserEntity,
  InviteUserValues,
  CommonResponse, UpdateUserValues,
} from '../shared/types';
import { API_ROUTES } from '../shared/constants/api.routes';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private apiService: ApiService,
  ) {
  }

  fetchUsers(params: QueryParams): Observable<ListResponse<UsersList>> {
    return this.apiService.get<ListResponse<UsersList>>(API_ROUTES.USERS.ROOT, params);
  }

  fetchUser({ id }: QueryId): Observable<UserEntity> {
    return this.apiService.get<UserEntity>(`${API_ROUTES.USERS.ROOT}/${id}`);
  }

  inviteUser(data: InviteUserValues): Observable<CommonResponse> {
    return this.apiService.post<InviteUserValues, CommonResponse>(API_ROUTES.USERS.INVITE, data);
  }

  updateUser({ id, ...data }: UpdateUserValues & QueryId): Observable<UserEntity> {
    return this.apiService.put<UpdateUserValues, UserEntity>(`${API_ROUTES.USERS.ROOT}/${id}`, data);
  }

  removeUser({ id }: QueryId): Observable<CommonResponse> {
    return this.apiService.delete<CommonResponse>(`${API_ROUTES.USERS.ROOT}/${id}`);
  }
}
