import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AUTH } from './shared/constants/routes';
import { AuthGuard, UnauthorizedGuard } from './core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
  },
  {
    path: AUTH,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [UnauthorizedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: true,
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule],
})
export class AppRouting { }
