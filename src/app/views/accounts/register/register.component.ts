import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormInputTypes } from '@aw/core/types/form-input-types';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { BadRequest } from '@aw/models/_index';
import { AccountsApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { CurrentCompanySettingsService } from './../../../services/states/current-company-settings.service';
import { RegisterRequest } from './register-request.model';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { FormFloatingComponent } from '../../../components/forms/inputs/form-floating/form-floating.component';
import { NonFieldErrorsComponent } from '../../../components/forms/errors/non-field-errors/non-field-errors.component';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ViewBaseComponent, CardComponent, FormsModule, ReactiveFormsModule, NonFieldErrorsComponent, FormFloatingComponent, FormTimezoneComponent, RouterLink, BtnLoadingComponent]
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly accountsApiService = inject(AccountsApiService);
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);
  private readonly route = inject(Router);
  private readonly toastrService = inject(ToastrService);

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
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

    this.accountsApiService
      .post<RegisterRequest, string>(registerRequest, ApiUrls.accounts.registerAccount)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('La cuenta ha sido creada con éxito.');
          this.route.navigateByUrl(SiteUrls.accounts.registerSuccess);
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
      companyName: ['', [Validators.required]],
      timezone: [this.currentCompanySettingsService.companySettings()?.timezone, [Validators.required]]
    });
  }
}
