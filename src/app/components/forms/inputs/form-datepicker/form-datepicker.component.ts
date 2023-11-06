import { Component, forwardRef, inject, Input } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LocalizationService, LocalizationUtils } from '@aw/core/features/localizations/_index';
import { FormInputTypes } from '@aw/core/types/_index';
import { BadRequest } from '@aw/models/_index';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

/* eslint-disable  @typescript-eslint/no-empty-function */

@Component({
  selector: 'aw-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormDatepickerComponent),
      multi: true
    }
  ]
})
export class FormDatepickerComponent {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);

  @Input({ required: true }) badRequest: BadRequest | undefined;
  @Input({ required: true }) form: FormGroup | undefined;
  @Input({ required: true }) submitted = false;
  @Input({ required: true }) fieldName = '';
  @Input() bsConfig: Partial<BsDatepickerConfig>;
  @Input() id: string;
  @Input() inputType = FormInputTypes.text;
  @Input() label = '';
  @Input() extraCss = '';
  @Input() placeholder = '';

  value?: Date;
  isDisabled = false;

  constructor() {
    this.id = Math.random().toString();

    // Locale BsDatepicker.
    const localeNgxBootstrap = LocalizationUtils.mapLocaleToNgxBootstrap(this.localizationService.getLocaleValue());
    this.bsLocaleService.use(localeNgxBootstrap);

    // Default BsDatepickerConfig.
    this.bsConfig = {
      containerClass: 'theme-default',
      showWeekNumbers: false,
      dateInputFormat: 'LL',
      adaptivePosition: true
    };
  }

  onChange = (_: any): void => {};

  onTouch = (): void => {};

  writeValue(value: Date): void {
    if (value !== undefined && value !== this.value) {
      this.value = value || undefined;
      this.onChange(this.value);
    } else {
      this.value = undefined;
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
