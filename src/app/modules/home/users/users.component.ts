import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchUsers, SetUsersLoading } from '../../../store/actions/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private store: Store) {
  }

  ngOnInit() {
    console.log('hmmm');
    this.fetchUsers();
  }

  fetchUsers() {
    console.log('fetch???')
    this.store.dispatch(new SetUsersLoading(true));
    this.store.dispatch(new FetchUsers({ page: 1, limit: 10 })).subscribe({
      next: async () => {
        this.store.dispatch(new SetUsersLoading(false));
      },
      error: () => {
        this.store.dispatch(new SetUsersLoading(false));
      },
    });
  }
}
