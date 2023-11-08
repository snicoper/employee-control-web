import { Component, Input, forwardRef, inject } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocalizationService, LocalizationUtils } from '@aw/core/features/localizations/_index';
import { BadRequest } from '@aw/models/bad-request';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-timepicker',
  templateUrl: './form-timepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormTimePickerComponent),
      multi: true
    }
  ]
})
export class FormTimePickerComponent {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);

  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input() bsConfig: Partial<BsDatepickerConfig>;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() showMeridian = false;
  @Input() id: string;
  @Input() label = '';
  @Input() extraCss = '';

  value: Date = new Date();
  isDisabled = false;

  constructor() {
    this.id = Math.random().toString();

    // Locale BsDatepicker.
    const localeNgxBootstrap = LocalizationUtils.mapLocaleToNgxBootstrap(this.localizationService.getLocaleValue());
    this.bsLocaleService.use(localeNgxBootstrap);

    // Default BsDatepickerConfig.
    this.bsConfig = {
      containerClass: 'theme-default'
    };
  }

  onChange = (_: Date): void => {};

  onTouch = (): void => {};

  writeValue(value: Date): void {
    if (value !== undefined && value !== this.value) {
      this.value = value || Date;
      this.onChange(this.value);
    } else {
      this.value = new Date();
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

  onChangeValue(value: Date): void {
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