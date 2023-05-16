import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../../store/state/auth.state';
import { Observable } from 'rxjs';
import { UserEntity } from '../../../shared/types';
import { Form } from '../../../shared/helpers';
import { ChangePassword, SetAuthLoading, UpdateProfile } from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Select(AuthState.getCurrentUser) currentUser$: Observable<UserEntity>;

  profileForm: FormGroup;

  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,  private store: Store) {
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });

    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      currentPassword: ['', Validators.required],
    });

    this.currentUser$.subscribe((data) => {
      this.profileForm.patchValue({
        email: data.email,
        name: data.name,
        surname: data.surname,
        phone: data.phone,
      });
    });
  }

  updateProfile(): void {
    if (!this.profileForm.valid) {
      Form.touchForm(this.profileForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new UpdateProfile(this.profileForm.value)).subscribe(
        async () => {
          this.store.dispatch(new SetAuthLoading(false));
        },
        () => {
          this.store.dispatch(new SetAuthLoading(false));
        },
      );
    }
  }

  changePassword(): void {
    if (!this.changePasswordForm.valid) {
      Form.touchForm(this.changePasswordForm);
    } else {
      this.store.dispatch(new SetAuthLoading(true));
      this.store.dispatch(new ChangePassword(this.changePasswordForm.value)).subscribe(
        async () => {
          this.store.dispatch(new SetAuthLoading(false));
          this.changePasswordForm.reset();
          Form.clearErrors(this.changePasswordForm);
        },
        () => {
          this.store.dispatch(new SetAuthLoading(false));
        },
      );
    }
  }

}
