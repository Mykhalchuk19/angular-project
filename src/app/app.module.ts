import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { AppRouting } from './app-routing';
import { AppComponent } from './app.component';
import { LoadingModule } from './shared/components';
import { AuthState } from './store/state/auth.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomHttpInterceptor } from './core';
import { UsersState } from './store/state/users.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    MatSnackBarModule,
    NgxsModule.forRoot([AuthState, UsersState],
      {
        developmentMode: true,
      },
    ),
    BrowserModule,
    AppRouting,
    BrowserAnimationsModule,
    LoadingModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomHttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
