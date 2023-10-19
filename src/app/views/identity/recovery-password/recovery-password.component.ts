import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { BadResponse } from '@aw/models/api/_index';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { IdentityApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { RecoveryPasswordRequest } from './recovery-password-request.model';

@Component({
  selector: 'aw-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private identityApiService = inject(IdentityApiService);

  form: FormGroup = this.fb.group({});
  badRequest: BadResponse | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;
  hasResponse = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.hasResponse = false;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const recoveryPasswordRequest = this.form.value as RecoveryPasswordRequest;

    this.identityApiService
      .create<RecoveryPasswordRequest, ResultResponse>(recoveryPasswordRequest, ApiUrls.recoveryPassword)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.hasResponse = true;
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }
}
