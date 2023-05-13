import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-wrapper',
  templateUrl: './error-wrapper.component.html',
  styleUrls: ['./error-wrapper.component.scss'],
})
export class ErrorWrapperComponent {
  @Input() isError: boolean;

  @Input() title: string;

  @Input() description: string;

  @Input() back: boolean;

  constructor(private router: Router) {
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
