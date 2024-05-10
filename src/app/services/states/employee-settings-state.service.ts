import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { LocalizationService } from '../../core/features/localizations/localization.service';
import { ApiUrl } from '../../core/urls/api-urls';
import { EmployeeSettings } from '../../models/entities/employee-settings.model';
import { ResultValue } from '../../models/result-response.model';
import { HttpClientApiService } from '../api/http-client-api.service';
import { StateService } from './state.service';

@Injectable({ providedIn: 'root' })
export class EmployeeSettingsStateService implements StateService<EmployeeSettings | null> {
  private readonly localizationService = inject(LocalizationService);
  private readonly httpClientApiService = inject(HttpClientApiService);

  private readonly employeeSettings$ = signal<EmployeeSettings | null>(null);
  private readonly loadingEmployeeSettings$ = signal(true);

  readonly employeeSettings = computed(() => this.employeeSettings$());
  readonly loadingEmployeeSettings = computed(() => this.loadingEmployeeSettings$());

  refresh(): void {
    this.loadEmployeeSettings();
  }

  clean(): void {
    this.employeeSettings$.set(null);
  }

  get(): EmployeeSettings | null {
    return this.employeeSettings$();
  }

  private loadEmployeeSettings(): void {
    this.loadingEmployeeSettings$.set(true);

    this.httpClientApiService
      .get<ResultValue<EmployeeSettings>>(ApiUrl.employees.getCurrentEmployeeSettings)
      .pipe(finalize(() => this.loadingEmployeeSettings$.set(false)))
      .subscribe({
        next: (result: ResultValue<EmployeeSettings>) => {
          this.employeeSettings$.set(result.value);
          this.localizationService.setTimezone(result.value.timezone);
        }
      });
  }
}
