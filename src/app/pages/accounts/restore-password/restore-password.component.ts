import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FieldErrorComponent } from '../../../components/forms/errors/field-error/field-error.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { PageSimpleComponent } from '../../../components/pages/page-simple/page-simple.component';
import { FormInputType } from '../../../core/types/form-input-type';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CustomValidators } from '../../../core/validators/custom-validators-form';
import { BadRequest } from '../../../models/bad-request';
import { ResultResponse } from '../../../models/result-response.model';
import { HttpClientApiService } from '../../../services/api/http-client-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { RestorePasswordRequest } from './restore-password-request.model';

@Component({
  selector: 'aw-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatCardModule,
    MatDivider,
    MatButtonModule,
    PageSimpleComponent,
    FormInputComponent,
    NonFieldErrorsComponent,
    BtnLoadingComponent,
    FieldErrorComponent
  ]
})
export class RestorePasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly snackBarService = inject(SnackBarService);

  private readonly recoveryPasswordChangeRequest: RestorePasswordRequest;

  readonly formInputType = FormInputType;
  readonly siteUrl = SiteUrl;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loading = false;
  hasRequiredData = true;

  constructor() {
    this.recoveryPasswordChangeRequest = { userId: '', code: '', password: '', confirmPassword: '' };
    this.recoveryPasswordChangeRequest.code = this.route.snapshot.queryParamMap.get('code') as string;
    this.recoveryPasswordChangeRequest.userId = this.route.snapshot.queryParamMap.get('userId') as string;

    if (!this.recoveryPasswordChangeRequest.code || !this.recoveryPasswordChangeRequest.userId) {
      this.hasRequiredData = false;
    }

    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.recoveryPasswordChangeRequest.password = this.form.get('password')?.value;
    this.recoveryPasswordChangeRequest.confirmPassword = this.form.get('confirmPassword')?.value;

    this.httpClientApiService
      .post<RestorePasswordRequest, ResultResponse>(
        this.recoveryPasswordChangeRequest,
        ApiUrl.accounts.recoveryPasswordChange
      )
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.snackBarService.success('Contraseña restablecida con éxito');
          this.router.navigateByUrl(SiteUrl.auth.login);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: CustomValidators.passwordMustMatch('password', 'confirmPassword') }
    );
  }
}
