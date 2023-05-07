import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ROUTES } from '../../shared/constants/routes';
import { Storage } from '../../shared/helpers';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) {
  }

  public canActivate(): Observable<boolean> | boolean {
    const token = Storage.getTokenFromStorage();
    if (token) {
      return true;
    } else {
      this.router.navigate([ROUTES.AUTH.LOGIN]);
      return false;
    }
  }
}
