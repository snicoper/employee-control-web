import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export abstract class CustomValidation {
  /** Custom validator para comprobar que una fecha sea menor a otra. */
  static dateStartGreaterThanFinish(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      const start = new Date(control?.value);
      const finish = new Date(checkControl?.value);

      if (start.getDate() > finish.getDate()) {
        checkControl?.setErrors({ startGreaterThanFinish: true });
      } else {
        checkControl?.setErrors(null);
      }

      return null;
    };
  }

  /** Validación contraseñas iguales. */
  static passwordMustMatch(controlName: string, checkControlName: string): ValidatorFn {
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
  }

  /** Validación valor sea un color hexadecimal. */
  static colorHexadecimal = (control: FormControl): { colorHexadecimal: boolean } | null => {
    const value = control.value as string;
    const match = /^#[0-9A-F]{6}$/i.test(value);

    return match ? null : { colorHexadecimal: true };
  };

  /** Validación de un array con un valor x. */
  static minLengthArray = (control: FormControl): { required: boolean } | null => {
    const values = control.value as number[];

    return values && values.length > 0 ? null : { required: true };
  };
}
