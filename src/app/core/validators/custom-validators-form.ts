import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';

export abstract class CustomValidators {
  /** Comprobar que una fecha sea menor a otra. */
  static readonly dateStartGreaterThanFinish = (controlName: string, checkControlName: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      const start = DateTime.fromJSDate(new Date(control?.value));
      const finish = DateTime.fromJSDate(new Date(checkControl?.value));

      if (start.valueOf() > finish.valueOf()) {
        checkControl?.setErrors({ startGreaterThanFinish: true });
      } else {
        checkControl?.setErrors(null);
      }

      return null;
    };
  };

  /** Contraseñas iguales. */
  static readonly passwordMustMatch = (controlName: string, checkControlName: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (control?.value !== checkControl?.value) {
        checkControl?.setErrors({ noPasswordMatch: true });
      } else {
        checkControl?.setErrors(null);
      }

      return null;
    };
  };

  /** El valor ha de ser un color hexadecimal. */
  static readonly colorHexadecimal = (controlName: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const match = /^#[0-9A-F]{6}$/i.test(control?.value);

      if (match) {
        control?.setErrors(null);
      } else {
        control?.setErrors({ colorHexadecimal: true });
      }

      return null;
    };
  };

  /** No permite fechas futuras. */
  static readonly noFutureDate = (controlName: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const value = DateTime.fromJSDate(new Date(control?.value));

      if (value.toMillis() > DateTime.local().toMillis()) {
        control?.setErrors({ noFutureDate: true });
      } else {
        control?.setErrors(null);
      }

      return null;
    };
  };

  /** Validación de un array con un valor > 0 */
  static readonly minLengthArray = (controlName: string): ValidatorFn => {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const values = control?.value;

      if (values && values.length > 0) {
        control?.setErrors(null);
      } else {
        control?.setErrors({ required: true });
      }

      return null;
    };
  };
}
