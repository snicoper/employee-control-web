import { FormControl } from '@angular/forms';

/** Un array al menos debe tener un elemento. */
export const minLengthArray = (control: FormControl): { required: boolean } | null => {
  const values = control.value as number[];

  return values && values.length > 0 ? null : { required: true };
};
