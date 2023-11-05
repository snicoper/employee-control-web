import { Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { BadRequest } from '@aw/models/_index';
import { CompanySettings } from '@aw/models/entities/company-settings.model';
import { CurrentCompanySettingsService } from '@aw/services/states/_index';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { ResultResponse } from './../../../models/result-response.model';
import { CompanySettingsApiService } from './../../../services/api/company-settings-api.service';

@Component({
  selector: 'aw-company-settings-edit',
  templateUrl: './company-settings-edit.component.html'
})
export class CompanySettingsEditComponent {
  private readonly currentCompanySettingsService = inject(CurrentCompanySettingsService);
  private readonly companySettingsApiService = inject(CompanySettingsApiService);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  readonly companySettings = computed(() => this.currentCompanySettingsService.companySettings());

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  loadingForm = false;
  submitted = false;
  nowWithOriginalTimezone = '';
  nowWithTimezoneSelected = '';
  siteUrls = SiteUrls;

  constructor() {
    this.setBreadcrumb();
    this.buildForm();
    this.setNowWithOriginalTimezone();
  }

  handleChangeTimezone(): void {
    const timezoneSelected = this.form.get('timezone')?.value as string;

    this.setNowWithOriginalTimezone();
    this.nowWithTimezoneSelected = DateTime.local()
      .setZone(timezoneSelected)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loadingForm = true;

    const companySettings = this.form.value as CompanySettings;
    companySettings.id = this.companySettings()?.id as string;

    this.companySettingsApiService
      .put<CompanySettings, ResultResponse>(companySettings, ApiUrls.companySettings.updateCompanySettings)
      .pipe(finalize(() => (this.loadingForm = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Configuración actualizada con éxito');
            this.router.navigateByUrl(SiteUrls.companySettings.details);
            this.currentCompanySettingsService.refresh();
          }
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Configuración', SiteUrls.companySettings.details)
      .add('Editar', SiteUrls.companySettings.edit, '', false);
  }

  private setNowWithOriginalTimezone(): void {
    this.nowWithOriginalTimezone = DateTime.local()
      .setZone(this.companySettings()?.timezone)
      .toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      timezone: [this.companySettings()?.timezone, [Validators.required]]
    });
  }
}
