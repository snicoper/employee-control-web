import { Component, Input, forwardRef } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '@aw/models/bad-request';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-switch',
  templateUrl: './form-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSwitchComponent),
      multi: true
    }
  ]
})
export class FormSwitchComponent {
  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() id: string;
  @Input() label = '';
  @Input() extraCss = '';

  value = false;
  isDisabled = false;

  constructor() {
    this.id = Math.random().toString();
  }

  onChange = (_: boolean): void => {};

  onTouch = (): void => {};

  writeValue(value: boolean): void {
    if (value !== this.value) {
      this.value = value || false;
      this.onChange(this.value);
    } else {
      this.value = false;
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