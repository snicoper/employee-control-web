import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { FieldErrorComponent } from './errors/field-error/field-error.component';
import { NonFieldErrorsComponent } from './errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from './inputs/form-checkbox/form-checkbox.component';
import { FormFloatingComponent } from './inputs/form-floating/form-floating.component';
import { FormInputComponent } from './inputs/form-input/form-input.component';
import { FormTextareaComponent } from './inputs/form-textarea/form-textarea.component';
import { TimezoneSelectorComponent } from './selectors/timezone-selector/timezone-selector.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  declarations: [
    FieldErrorComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormFloatingComponent,
    TimezoneSelectorComponent
  ],
  exports: [
    FieldErrorComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormFloatingComponent,
    TimezoneSelectorComponent
  ]
})
export class AwFormsModule {}
