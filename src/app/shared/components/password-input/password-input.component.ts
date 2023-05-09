import { Component, forwardRef, Injector, Input, OnInit, Optional } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomErrorStateMatcher } from '../../helpers';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent  implements ControlValueAccessor, OnInit {
  @Input() placeholder: string;

  isPassword = true;

  _value: string;

  control: NgControl;

  matcher: ErrorStateMatcher;

  constructor(
    @Optional()
    private injector: Injector) {
  }

  ngOnInit() {
    this.control = this.injector.get(NgControl);
    this.matcher = new CustomErrorStateMatcher(this.control);
  }

  propagateTouched: (arg: any) => void;

  showPassword(event: Event): void {
    this.isPassword = !this.isPassword;
    event.stopPropagation();
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (_: any) => {};

  registerOnChange(fn: (_: any) => void) {
    this.propagateChange = fn;
  }

  writeValue(value: string) {
    if (value !== undefined) {
      this._value = value;
      this.propagateChange(this.value);
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (val) {
      this._value = val;
      this.propagateChange(this._value);
    }
  }

  addEvent() {
    this.value = this._value;
    this.propagateChange(this.value);
  }
}
