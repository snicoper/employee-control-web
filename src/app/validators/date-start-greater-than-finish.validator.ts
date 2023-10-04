import { FormGroup } from '@angular/forms';

/** Custom validator para comprobar que una fecha sea menor a otra. */
export const dateStartGreaterThanFinish =
  (controlName: string, checkControlName: string) =>
  (formGroup: FormGroup): void => {
    const control = formGroup.controls[controlName];
    const checkControl = formGroup.controls[checkControlName];

    const start = new Date(control.value);
    const finish = new Date(checkControl.value);

    if (start.getDate() > finish.getDate()) {
      checkControl.setErrors({ startGreaterThanFinish: true });
    } else {
      checkControl.setErrors(null);
    }
  };
