import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AuthRouting } from './auth.routing';
import { AuthComponent } from './auth.component';



@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRouting,
  ],
})
export class AuthModule { }
