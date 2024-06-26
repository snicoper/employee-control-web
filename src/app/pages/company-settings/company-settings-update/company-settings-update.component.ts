import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { finalize } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { BtnBackComponent } from '../../../components/buttons/btn-back/btn-back.component';
import { BtnLoadingComponent } from '../../../components/buttons/btn-loading/btn-loading.component';
import { FormCheckboxComponent } from '../../../components/forms/inputs/form-checkbox/form-checkbox.component';
import { FormInputComponent } from '../../../components/forms/inputs/form-input/form-input.component';
import { FormTimezoneComponent } from '../../../components/forms/inputs/form-timezone/form-timezone.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { FormInputType } from '../../../core/types/form-input-type';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { BadRequest } from '../../../models/bad-request';
import { CompanySettings } from '../../../models/entities/company-settings.model';
import { Result } from '../../../models/result-response.model';
import { HttpClientApiService } from '../../../services/api/http-client-api.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { CompanySettingsStateService } from '../../../services/states/company-settings-state.service';

@Component({
  selector: 'aw-company-settings-update',
  templateUrl: './company-settings-update.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatDivider,
    PageBaseComponent,
    PageHeaderComponent,
    FormTimezoneComponent,
    FormInputComponent,
    FormCheckboxComponent,
    BtnBackComponent,
    BtnLoadingComponent
  ]
})
export class CompanySettingsUpdateComponent {
  private readonly companySettingsStateService = inject(CompanySettingsStateService);
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly snackBarService = inject(SnackBarService);
  private readonly router = inject(Router);

  readonly companySettings = computed(() => this.companySettingsStateService.companySettings());

  readonly breadcrumb = new BreadcrumbCollection();

  readonly siteUrl = SiteUrl;
  readonly formInputTypes = FormInputType;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  nowWithOriginalTimezone = '';
  nowWithTimezoneSelected = '';

  constructor() {
    this.setBreadcrumb();
    this.buildForm();
    this.setNowWithOriginalTimezone();
    this.eventListener();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const companySettings = this.form.value as CompanySettings;
    companySettings.id = this.companySettings()?.id as string;

    this.updateCompanySettings(companySettings);
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Configuración', SiteUrl.companySettings.details)
      .add('Editar', SiteUrl.companySettings.update, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithOriginalTimezone = DateTime.local()
      .setZone(this.companySettings()?.timezone)
      .toLocaleString(DateTime.TIME_SIMPLE);
  }

  private updateCompanySettings(companySettings: CompanySettings): void {
    this.httpClientApiService
      .put<CompanySettings, Result>(companySettings, ApiUrl.companySettings.updateCompanySettings)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: Result) => {
          if (result.succeeded) {
            this.snackBarService.success('Configuración actualizada con éxito');
            this.router.navigateByUrl(SiteUrl.companySettings.details);
            this.companySettingsStateService.refresh();
          }
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      timezone: [this.companySettings()?.timezone, [Validators.required]],
      periodTimeControlMax: [
        this.companySettings()?.periodTimeControlMax,
        [Validators.required, Validators.max(24), Validators.min(1)]
      ],
      weeklyWorkingHours: [this.companySettings()?.weeklyWorkingHours, [Validators.required, Validators.min(1)]],
      geolocationRequired: [this.companySettings()?.geolocationRequired]
    });
  }

  private eventListener(): void {
    this.form.controls['timezone'].valueChanges.pipe(takeUntilDestroyed()).subscribe((timezone: string) => {
      this.setNowWithOriginalTimezone();
      this.nowWithTimezoneSelected = DateTime.local().setZone(timezone).toLocaleString(DateTime.TIME_SIMPLE);
    });
  }
}
