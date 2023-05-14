import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRouting,
    SharedModule,
  ],
})
export class HomeModule { }
