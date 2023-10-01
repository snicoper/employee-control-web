import { FormControl } from '@angular/forms';

/** Comprueba que un color hexadecimal sea valido. */
export const colorHexadecimal = (control: FormControl): { colorHexadecimal: boolean } | null => {
  const value = control.value as string;
  const match = /^#[0-9A-F]{6}$/i.test(value);

  return match ? null : { colorHexadecimal: true };
};
