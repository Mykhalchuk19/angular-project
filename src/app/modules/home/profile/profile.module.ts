import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRouting } from './profile.routing';
import { SharedModule } from '../../../shared';



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRouting,
    SharedModule,
  ],
})
export class ProfileModule { }
