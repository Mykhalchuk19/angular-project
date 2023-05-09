import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../store/state/auth.state';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Form } from '../../../shared/helpers';
import { ResetPassword, SetAuthLoading } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  @Select(AuthState.loading) loading$: Observable<boolean>;

  resetPasswordForm: FormGroup;

  isSentRequest = false;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  ngOnDestroy() {
  }


  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      Form.touchForm(this.resetPasswordForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new ResetPassword(this.resetPasswordForm.value)).subscribe({
        next:  () => {
          this.store.dispatch(new SetAuthLoading(false));
        },
        error:  () => {
          this.store.dispatch(new SetAuthLoading(false));
        },
        complete: () => {
          this.isSentRequest = true;
        },
      });
    }
  }

  back() {
    this.router.navigateByUrl('/auth/login');
  }
}
