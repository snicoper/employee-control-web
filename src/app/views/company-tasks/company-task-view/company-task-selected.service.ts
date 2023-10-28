import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { CompanyTask } from '@aw/models/entities/company-task.model';
import { CompanyTaskApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';

@Injectable()
export class CompanyTaskSelectedService {
  private readonly companyTaskApiService = inject(CompanyTaskApiService);

  private readonly companyTaskSelected$ = signal<CompanyTask | null>(null);
  private readonly companyTaskLoading$ = signal(false);

  readonly companyTaskSelected = computed(() => this.companyTaskSelected$());
  readonly companyTaskLoading = computed(() => this.companyTaskLoading$());

  loadData(companyTaskId: string): void {
    this.companyTaskLoading$.set(true);
    const url = ApiUrls.replace(ApiUrls.companyTasks.getCompanyTasksById, { id: companyTaskId });

    this.companyTaskApiService
      .get<CompanyTask>(url)
      .pipe(finalize(() => this.companyTaskLoading$.set(false)))
      .subscribe({
        next: (result: CompanyTask) => {
          this.companyTaskSelected$.set(result);
        }
      });
  }
}
