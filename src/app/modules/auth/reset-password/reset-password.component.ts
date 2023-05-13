import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../store/state/auth.state';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Form } from '../../../shared/helpers';
import { CheckToken, ResetPassword, SetAuthLoading } from '../../../store/actions/auth.actions';
import { TokenType } from '../../../shared/types';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  @Select(AuthState.loading) loading$: Observable<boolean>;

  resetPasswordForm: FormGroup;

  isSentRequest = false;

  token: string;

  isError = false;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
    this.route.queryParams.subscribe((params) => {
      this.token = params.token;
    });
    this.store.dispatch(new CheckToken({ token: this.token, type: TokenType.RESET })).subscribe({
      error:  () => {
        this.isError = true;
      },
    });
  }

  ngOnDestroy() {
  }


  resetPassword(): void {
    if (!this.resetPasswordForm.valid) {
      Form.touchForm(this.resetPasswordForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new ResetPassword({ ...this.resetPasswordForm.value, token: this.token })).subscribe({
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
