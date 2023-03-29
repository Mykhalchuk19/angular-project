import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingModule } from './shared/components';
import { AuthState } from './store/state/auth.state';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    NgxsModule.forRoot([AuthState],
      {
        developmentMode: true,
      },
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoadingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
