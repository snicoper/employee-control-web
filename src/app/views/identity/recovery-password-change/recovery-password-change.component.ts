import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormInputTypes } from '@aw/core/types/form-input-types';
import { ApiUrls } from '@aw/core/urls/_index';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { BadResponse } from '@aw/models/api/_index';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { IdentityApiService } from '@aw/services/api/identity-api.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RecoveryPasswordChangeRequest } from './recovery-password-change-request.model';

@Component({
  selector: 'aw-recovery-password-change',
  templateUrl: './recovery-password-change.component.html',
  styleUrls: ['./recovery-password-change.component.scss']
})
export class RecoveryPasswordChangeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly identityApiService = inject(IdentityApiService);
  private readonly toastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({});
  badRequest: BadResponse | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;
  errorMessages: string[] = [];

  private readonly recoveryPasswordChangeRequest: RecoveryPasswordChangeRequest;

  constructor() {
    this.recoveryPasswordChangeRequest = { userId: '', code: '', password: '', confirmPassword: '' };
    this.recoveryPasswordChangeRequest.code = this.route.snapshot.queryParamMap.get('code') as string;
    this.recoveryPasswordChangeRequest.userId = this.route.snapshot.queryParamMap.get('userId') as string;

    if (!this.recoveryPasswordChangeRequest.code || !this.recoveryPasswordChangeRequest.userId) {
      this.errorMessages.push('Faltan datos necesarios para validar el correo electrónico.');
    }

    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;
    this.errorMessages = [];

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.recoveryPasswordChangeRequest.password = this.form.get('password')?.value;
    this.recoveryPasswordChangeRequest.confirmPassword = this.form.get('confirmPassword')?.value;

    this.identityApiService
      .post<RecoveryPasswordChangeRequest, ResultResponse>(
        this.recoveryPasswordChangeRequest,
        ApiUrls.accounts.recoveryPasswordChange
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (!result.succeeded) {
            this.errorMessages = result.errors;

            return;
          }

          this.toastrService.success('Contraseña restablecida con éxito');
          this.router.navigateByUrl(SiteUrls.login);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
}
