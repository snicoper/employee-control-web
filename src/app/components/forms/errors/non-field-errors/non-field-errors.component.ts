import { Component, Input } from '@angular/core';
import { ValidationErrors } from '../../../../core/constants/_index';
import { BadRequest } from '../../../../models/types/_index';

@Component({
  selector: 'aw-non-field-errors',
  templateUrl: './non-field-errors.component.html'
})
export class NonFieldErrorsComponent {
  @Input() badRequest: BadRequest = {
    errors: [],
    status: 0,
    title: '',
    type: ''
  };

  validationErrors = ValidationErrors;

  get hasErrors(): boolean {
    return !!(this.badRequest?.errors && this.badRequest.errors.indexOf(ValidationErrors.nonFieldErrors));
  }

  getErrors(): string {
    const index = this.badRequest.errors.indexOf(ValidationErrors.nonFieldErrors);

    return this.badRequest.errors[index];
  }
}
