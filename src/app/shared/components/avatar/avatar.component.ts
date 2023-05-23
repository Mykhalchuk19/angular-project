import { Component } from '@angular/core';
import { ACCEPTED_TYPES } from '../../constants';
import { Select, Store } from '@ngxs/store';
import { RemoveAvatar, UploadAvatar } from '../../../store/actions/auth.actions';
import { AuthState } from '../../../store/state/auth.state';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

  @Select(AuthState.getAvatarUrl) avatarUrl$: Observable<string | undefined>;

  acceptedTypes = ACCEPTED_TYPES;

  constructor(private store: Store) {

  }


  changeAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    if ((input?.files?.length || 0) > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const file = input.files[0];

      this.store.dispatch(new UploadAvatar(file));
    }
  }

  removeAvatar() {
    this.store.dispatch(new RemoveAvatar());
  }
}
