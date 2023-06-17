import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetMe, LogOut } from '../../store/actions/auth.actions';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthState } from '../../store/state/auth.state';
import { Storage } from '../../shared/helpers';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

  @Select(AuthState.getFullName) fullName$: Observable<string>;

  @Select(AuthState.getAvatarUrl) avatarUrl$: Observable<string | undefined>;

  constructor(
    private store: Store,
    private observer: BreakpointObserver,
    private router: Router,
  ) {
  }


  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd),
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  ngOnInit() {
    this.store.dispatch(new GetMe()).subscribe(({
      error: () => {
        Storage.removeTokenFromStorage();
        this.router.navigate(['/auth/login']);
      },
    }));
  }

  logOut() {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/auth/login']);
  }
}
