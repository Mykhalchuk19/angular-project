import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ROUTES } from '../../shared/constants/routes';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ROUTES.PROFILE,
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: ROUTES.USERS.ROOT,
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {
}
