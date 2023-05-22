import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FileData } from '../shared/types';
import { API_ROUTES } from '../shared/constants/api.routes';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    private apiService: ApiService,
  ) {
  }

  uploadFile(file: File): Observable<FileData> {
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.upload(
      API_ROUTES.FILES.UPLOAD,
      formData,
    );
  }
}
