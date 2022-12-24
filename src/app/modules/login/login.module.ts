import { NgModule } from '@angular/core';

// Components
import { LoginComponent } from './login.component';

// Modules
import { LoginRouting } from './login.routing';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    LoginRouting,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class LoginModule { }
