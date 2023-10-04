import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormInputTypes } from '@core/types/_index';
import { BadRequest } from '@models/_index';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-floating',
  templateUrl: './form-floating.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFloatingComponent),
      multi: true
    }
  ]
})
export class FormFloatingComponent {
  @Input() id = '';
  @Input() form: FormGroup | undefined;
  @Input() fieldName = '';
  @Input() inputType = FormInputTypes.text;
  @Input() label = '';
  @Input() extraCss = '';
  @Input() badRequest: BadRequest | undefined;
  @Input() submitted = false;
  @Input() placeholder = '';

  value = '';
  isDisabled = false;

  constructor() {
    this.id = Math.random().toString();
  }

  onChange = (_: any): void => {};

  onTouch = (): void => {};

  writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value || '';
      this.onChange(this.value);
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onChangeValue(value: any): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form?.get(this.fieldName) as FormGroup;

    return !!(
      (this.submitted && control.invalid) ||
      (this.badRequest?.errors && this.badRequest.errors[this.fieldName])
    );
  }
}
