import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { logError } from '@aw/core/errors/log-messages';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { CompanyResponse } from './../../models/api/company-response.model';
import { CompaniesApiService } from './../api/companies-api.service';
import { BaseStore } from './base-store';

@Injectable({ providedIn: 'root' })
export class CompanyEmployeeStore implements BaseStore<CompanyResponse | null> {
  private readonly companiesApiService = inject(CompaniesApiService);

  private readonly companyEmployee$ = signal<CompanyResponse | null>(null);

  constructor() {
    this.refresh();
  }

  refresh(): void {
    this.companiesApiService.get<CompanyResponse>(ApiUrls.companies.getCompanyByCurrentUser).subscribe({
      next: (result: CompanyResponse) => {
        this.companyEmployee$.set(result);
      },
      error: (error: HttpErrorResponse) => {
        logError(error.error);
      }
    });
  }

  getValue(): CompanyResponse | null {
    return this.companyEmployee$();
  }

  setValue(entity: CompanyResponse | null): void {
    this.companyEmployee$.set(entity);
  }
}
