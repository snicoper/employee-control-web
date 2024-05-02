import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiUrl } from '../../core/urls/api-urls';
import { CompanySettings } from '../../models/entities/company-settings.model';
import { ApiService } from '../api/api-service.service';
import { StateService } from './state.service';

/** Settings de la compañía actual. */
@Injectable({ providedIn: 'root' })
export class CompanySettingsStateService implements StateService<CompanySettings | null> {
  private readonly apiService = inject(ApiService);

  private readonly companySettings$ = signal<CompanySettings | null>(null);
  private readonly loadingCompanySettings$ = signal(false);

  readonly companySettings = computed(() => this.companySettings$());
  readonly loadingCompanySettings = computed(() => this.loadingCompanySettings$());

  refresh(): void {
    this.loadCompanySettings();
  }

  get(): CompanySettings | null {
    return this.companySettings$();
  }

  clean(): void {
    this.loadingCompanySettings$.set(false);
    this.companySettings$.set(null);
  }

  private loadCompanySettings(): void {
    this.loadingCompanySettings$.set(true);

    this.apiService
      .get<CompanySettings>(ApiUrl.companySettings.getCompanySettings)
      .pipe(finalize(() => this.loadingCompanySettings$.set(false)))
      .subscribe({
        next: (result: CompanySettings) => this.companySettings$.set(result)
      });
  }
}
