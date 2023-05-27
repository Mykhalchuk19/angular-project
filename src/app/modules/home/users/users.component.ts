import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FetchUsers, SetUsersLoading } from '../../../store/actions/users.actions';
import { ListResponse, UserEntity, UsersList } from '../../../shared/types';
import { USERS_TABLE_COLUMNS } from '../../../shared/constants';
import { Observable } from 'rxjs';
import { UsersState } from '../../../store/state/users.state';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  @Select(UsersState.usersList) usersList$: Observable<ListResponse<UsersList>>;

  public displayedColumns: string[] = USERS_TABLE_COLUMNS;

  public dataSource: UserEntity[];

  public itemsCount: number;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.usersList$.subscribe((data) => {
      this.dataSource = data?.items;
      this.itemsCount = data?.meta?.itemCount;
    });
  }


  ngAfterViewInit() {
    this.fetchUsers();
  }

  fetchUsers() {
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
