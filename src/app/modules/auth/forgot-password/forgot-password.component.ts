import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../store/state/auth.state';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Form } from '../../../shared/helpers';
import { ForgotPassword, SetAuthLoading } from '../../../store/actions/auth.actions';
import { ROUTES } from '../../../shared/constants/routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  @Select(AuthState.loading) loading$: Observable<boolean>;

  forgotPasswordForm: FormGroup;

  isSentRequest = false;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy() {
  }


  forgotPassword(): void {
    if (!this.forgotPasswordForm.valid) {
      Form.touchForm(this.forgotPasswordForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new ForgotPassword(this.forgotPasswordForm.value)).subscribe({
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
