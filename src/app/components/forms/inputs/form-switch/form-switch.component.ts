import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, Renderer2, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BadRequest } from '../../../../models/bad-request';
import { FieldErrorComponent } from '../../errors/field-error/field-error.component';

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
  ],
  standalone: true,
  imports: [FormsModule, NgClass, FieldErrorComponent]
})
export class FormSwitchComponent implements ControlValueAccessor {
  private readonly renderer = inject(Renderer2);
  private readonly elementRef = inject(ElementRef);

  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() id: string;
  @Input() label = '';
  @Input() extraCss = '';
  @Input() isDisabled = false;

  value = false;

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
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }

  onChangeValue(value: boolean): void {
    this.onChange(value);
  }

  isInvalid(): boolean {
    const control = this.form?.get(this.fieldName) as FormGroup;

    return !!((this.submitted && control.invalid) || this.badRequest?.errors[this.fieldName]);
  }
}
