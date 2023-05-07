import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes';
import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: ROUTES.AUTH.LOGIN,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule],
})
export class AppRouting { }
