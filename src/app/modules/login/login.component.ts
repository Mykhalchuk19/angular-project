import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthState } from '../../store/state/auth.state';
import { Login, SetAuthLoading } from '../../store/actions/auth.actions';
import { Form } from '../../shared/helpers';
import { ROUTES } from '../../shared/constants/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(AuthState.loading) loading$: Observable<boolean>;

  loginForm: FormGroup;

  isPassword = true;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
  }


  login(): void {
    if (!this.loginForm.valid) {
      Form.touchForm(this.loginForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new Login(this.loginForm.value)).subscribe(
        async () => {
          this.store.dispatch(new SetAuthLoading(false));
          await this.router.navigate([ROUTES.ROOT]);
        },
        () => {
          this.store.dispatch(new SetAuthLoading(false));
        },
      );
    }
  }

  showPassword(event: Event): void {
    this.isPassword = !this.isPassword;
    event.stopPropagation();
  }

}
