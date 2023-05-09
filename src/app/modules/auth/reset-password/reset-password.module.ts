import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRouting } from './reset-password.routing';



@NgModule({
  declarations: [
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule, ResetPasswordRouting,
  ],
})
export class ResetPasswordModule { }
