import { Component, forwardRef, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '../../../../models/types/_index';

@Component({
  selector: 'aw-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormCheckboxComponent),
      multi: true
    }
  ]
})
export class FormCheckboxComponent {
  @Input() id: string;
  @Input() form: FormGroup | undefined;
  @Input() fieldName = '';
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
      this.value = value || null;
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
      (this.badRequest?.errors && this.badRequest.errors.indexOf(this.fieldName))
    );
  }
}
