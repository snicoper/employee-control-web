import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FieldErrorComponent } from './errors/field-error/field-error.component';
import { NonFieldErrorsComponent } from './errors/non-field-errors/non-field-errors.component';
import { FormCheckboxComponent } from './inputs/form-checkbox/form-checkbox.component';
import { FormColorComponent } from './inputs/form-color/form-color.component';
import { FormDatepickerComponent } from './inputs/form-datepicker/form-datepicker.component';
import { FormFloatingComponent } from './inputs/form-floating/form-floating.component';
import { FormInputComponent } from './inputs/form-input/form-input.component';
import { FormTextareaComponent } from './inputs/form-textarea/form-textarea.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot()],
  declarations: [
    FieldErrorComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormFloatingComponent,
    FormDatepickerComponent,
    FormColorComponent
  ],
  exports: [
    FieldErrorComponent,
    NonFieldErrorsComponent,
    FormInputComponent,
    FormCheckboxComponent,
    FormTextareaComponent,
    FormFloatingComponent,
    FormDatepickerComponent,
    FormColorComponent
  ]
})
export class AwFormsModule {}
