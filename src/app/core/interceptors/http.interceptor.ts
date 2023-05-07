import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '../../shared/helpers';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  intercept( request: HttpRequest<number>, next: HttpHandler ): Observable<HttpEvent<string>> {
    const token = Storage.getTokenFromStorage() ?? '';

    if (token) {
      request = request.clone( { headers: request.headers.set( 'Authorization', 'Bearer ' + token ) } );
    }

    if (!request.headers.has( 'Content-Type') ) {
      request = request.clone( { headers: request.headers.set( 'Content-Type', 'application/json' ) } );
    } else {
      request = request.clone( { headers: request.headers.delete( 'Content-Type' ) } );
    }

    request = request.clone( { headers: request.headers.set( 'Accept', 'application/json' ) } );

    return next.handle( request );
  }
}
