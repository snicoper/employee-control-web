import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormInputTypes } from '@aw/core/types/form-input-types';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { BadResponse } from '@aw/models/api/_index';
import { IdentityApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RegisterRequest } from './register-request.model';

@Component({
  selector: 'aw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly identityApiService = inject(IdentityApiService);
  private readonly route = inject(Router);
  private readonly toastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({});
  badRequest: BadResponse | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const registerRequest = this.form.value as RegisterRequest;

    this.identityApiService
      .post<RegisterRequest, string>(registerRequest, ApiUrls.accounts.registerIdentity)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('La cuenta ha sido creada con éxito.');
          this.route.navigateByUrl(SiteUrls.registerSuccess);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      companyName: ['', [Validators.required]]
    });
  }
}
