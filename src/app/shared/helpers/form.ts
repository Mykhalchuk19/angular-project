import { FormGroup } from '@angular/forms';

export class Form {
  public static touchForm(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
