import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ROUTES } from '../../shared/constants/routes';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: ROUTES.AUTH.LOGIN,
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
      },
      {
        path: ROUTES.AUTH.FORGOT_PASSWORD,
        loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRouting {
}
