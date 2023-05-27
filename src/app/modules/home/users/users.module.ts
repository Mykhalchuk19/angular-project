import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRouting } from './users.routing';
import { SharedModule } from '../../../shared';



@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UsersRouting,
    SharedModule,
  ],
})
export class UsersModule { }
