import { ErrorStateMatcher } from '@angular/material/core';
import { NgControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  constructor(private realControl: NgControl) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      this.realControl &&
      this.realControl.invalid && (
        this.realControl.dirty ||
        this.realControl.touched ||
        isSubmitted
      )
    );
  }
}
