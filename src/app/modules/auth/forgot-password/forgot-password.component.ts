import { Component } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {AuthState} from "../../../store/state/auth.state";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Form} from "../../../shared/helpers";
import {Login, SetAuthLoading} from "../../../store/actions/auth.actions";
import {ROUTES} from "../../../shared/constants/routes";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  @Select(AuthState.loading) loading$: Observable<boolean>;

  forgotPasswordForm: FormGroup;


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


  login(): void {
    if (!this.forgotPasswordForm.valid) {
      Form.touchForm(this.forgotPasswordForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new Login(this.forgotPasswordForm.value)).subscribe(
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
}
