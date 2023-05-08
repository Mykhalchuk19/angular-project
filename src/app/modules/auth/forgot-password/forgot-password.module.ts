import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRouting } from './forgot-password.routing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { LoginRouting } from '../login/login.routing';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared';



@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule, ForgotPasswordRouting,  LoginRouting,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ForgotPasswordModule { }
