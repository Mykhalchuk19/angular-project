import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../store/state/auth.state';
import { Observable } from 'rxjs';
import { UserEntity } from '../../../shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  @Select(AuthState.getCurrentUser) currentUser$: Observable<UserEntity>;

  profileForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
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
}
