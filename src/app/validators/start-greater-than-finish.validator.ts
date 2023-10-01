import { FormGroup } from '@angular/forms';

/** Custom validator para comprobar que la fecha inicio sea menor a fecha final. */
export const startGreaterThanFinish =
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
