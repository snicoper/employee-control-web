import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '../../../../models/_index';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-textarea',
  templateUrl: './form-textarea.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTextareaComponent),
      multi: true
    }
  ]
})
export class FormTextareaComponent implements ControlValueAccessor {
  /** Inputs. */
  @Input() id = '';
  @Input() form: FormGroup | undefined;
  @Input() fieldName = '';
  @Input() label = '';
  @Input() extraCss = '';
  @Input() badRequest: BadRequest | undefined;
  @Input() submitted = false;
  @Input() placeholder = '';
  @Input() rows = 3;
  @Input() cols = 0;

  /** Properties. */
  value = '';
  isDisabled = false;

  constructor() {
    this.id = Math.random().toString();
  }

  onChange = (_: string): void => {};

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
    const control = this.form?.get(this.fieldName);

    return !!(
      (this.submitted && control?.invalid) ||
      (this.badRequest?.errors && this.badRequest.errors.indexOf(this.fieldName))
    );
  }
}
