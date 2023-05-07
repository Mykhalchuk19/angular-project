import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetMe } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new GetMe());
  }
}
