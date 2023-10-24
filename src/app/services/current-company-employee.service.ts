import { Injectable, inject, signal } from '@angular/core';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { CurrentCompanyEmployeeResponse } from '@aw/models/api/_index';
import { CompaniesApiService } from './api/_index';

@Injectable({ providedIn: 'root' })
export class CurrentCompanyEmployeeService {
  private readonly companiesApiService = inject(CompaniesApiService);

  private readonly currentCompanyEmployeeResponse$ = signal<CurrentCompanyEmployeeResponse | null>(null);

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.companiesApiService.get<CurrentCompanyEmployeeResponse>(ApiUrls.companies.getCompanyByCurrentUser).subscribe({
      next: (result: CurrentCompanyEmployeeResponse) => {
        this.currentCompanyEmployeeResponse$.set(result);
      }
    });
  }

  getValue(): CurrentCompanyEmployeeResponse | null {
    return this.currentCompanyEmployeeResponse$();
  }

  setValue(entity: CurrentCompanyEmployeeResponse | null): void {
    this.currentCompanyEmployeeResponse$.set(entity);
  }
}
