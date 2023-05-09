import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeaderType } from '../shared/constants';

type HeadersConf = {
  'Content-Type'?: string,
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  loading = false;

  apiUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  setHeaders(headerType: HeaderType): HttpHeaders {
    const headersConf: HeadersConf = {};
    if (headerType === 'json') {
      headersConf['Content-Type'] = 'application/json';
    } else if (headerType === 'form') {
      headersConf['Content-Type'] = 'application/x-www-form-urlencoded';
    } else if (headerType === 'multipart') {
      headersConf['Content-Type'] = 'multipart/form-data';
    }

    return new HttpHeaders(headersConf);
  }

  get<P>(path: string, params = {}, headerType = HeaderType.JSON): Observable<P> {
    const headers = this.setHeaders(headerType);

    return this.http.get<P>(this.apiUrl + path, { headers, params });
  }

  patch(path: string, body: any = {}, headerType = HeaderType.JSON): Observable<unknown> {
    const headers = this.setHeaders(headerType);

    return this.http.patch(this.apiUrl + path, body, { headers });
  }

  post<T, P>(path: string, body: T, headerType  = HeaderType.JSON): Observable<P> {
    const headers = this.setHeaders(headerType);

    return this.http.post<P>(this.apiUrl + path, body, { headers });
  }

  put(path: string, body: any = {}, headerType  = HeaderType.JSON): Observable<unknown> {
    const headers = this.setHeaders(headerType);

    return this.http.put(this.apiUrl + path, body, { headers });
  }

  delete(path: string, params: any = {}, headerType  = HeaderType.JSON): Observable<unknown> {
    const headers = this.setHeaders(headerType);

    return this.http.delete(this.apiUrl + path, { headers, params });
  }

  // upload(path, formData, method = 'put', headers?: HttpHeaders) {
  //   if (!headers) {
  //     headers = new HttpHeaders();
  //     headers = headers.append('Content-Type', 'false');
  //   }
  //
  //   return this.http[method](this.apiUrl + path, formData, {
  //     reportProgress: true,
  //     observe: 'events',
  //     headers,
  //   }).pipe(
  //     map(event => event),
  //     catchError(this.handleError),
  //   );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
  //   }
  //   return throwError(error.error.error || 'Something bad happened. Please try again later.');
  // }

}
