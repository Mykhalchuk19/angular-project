import { Component, Input, HostBinding, AfterViewInit, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: [ './loading.component.scss' ],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1,
        'pointer-events': 'all',
      })),

      state('immediateShow', style({
        opacity: 1,
        'pointer-events': 'all',
      })),

      state('hide', style({
        opacity: 0,
        'pointer-events': 'none',
      })),

      transition('show => hide', [
        animate('200ms'),
      ]),

      transition('immediateShow => hide', [
        animate('200ms'),
      ]),

      transition('hide => show', [
        style({
          'pointer-events': 'all',
        }),
        animate('200ms'),
      ]),

      transition('hide => immediateShow', [
        style({
          'pointer-events': 'all',
        }),
        animate('0ms'),
      ]),
    ]),
  ],
})

export class LoadingComponent implements AfterViewInit, OnChanges {

  @Input() loading = false;

  @Input() immediateShow = false;

  @Input() isGlobal = false;

  @HostBinding('@showHide') get animation() {
    if (this.loading) {
      if (this.immediateShow) {
        return 'immediateShow';
      } else {
        return 'show';
      }
    } else {
      return 'hide';
    }
  }

  ngAfterViewInit() {
    if (this.loading && this.isGlobal) {
      this.disableScroll();
    }
  }

  ngOnChanges() {
    if (this.isGlobal) {
      if (this.loading) {
        window.scrollTo(0, 0);
        this.disableScroll();
      } else {
        this.enableScroll();
      }
    }
  }

  disableScroll = () => {
    document.body.style.overflow = 'hidden';
    document.body.style.height = `${window.innerHeight}px`;
  };

  enableScroll = () => {
    document.body.style.overflow = '';
    document.body.style.height = '';
  };
}
