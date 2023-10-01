import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest, FormInputTypes } from '../../../../models/types/_index';

@Component({
  selector: 'aw-form-input',
  templateUrl: './form-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor {
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
      (this.badRequest?.errors && this.badRequest.errors.indexOf(this.fieldName))
    );
  }
}
