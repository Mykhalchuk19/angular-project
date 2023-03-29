import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '../../store/state/auth.state';
import { Login, SetAuthLoading } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Select(AuthState.loading) loading$: Observable<boolean>;

  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new Login(this.loginForm.value)).subscribe(
        async (value) => {
          console.log(value);
        },
      );
    }
  }
}
