import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { EmployeesApiService } from '@aw/services/api/employees-api.service';
import { finalize } from 'rxjs';
import { EmployeeSelectedResponse } from './employee-selected-response.model';

@Injectable()
export class EmployeeSelectedService {
  private readonly employeeSelected$ = signal<EmployeeSelectedResponse | undefined>(undefined);
  private readonly loading$ = signal(false);

  private readonly employeesApiService = inject(EmployeesApiService);

  readonly employeeSelected = computed(() => this.employeeSelected$());
  readonly loading = computed(() => this.loading$());

  loadEmployeeById(employeeId: string): void {
    this.loading$.set(true);
    const url = SiteUrls.replace(ApiUrls.employees.getEmployeeById, { id: employeeId });

    this.employeesApiService
      .get<EmployeeSelectedResponse>(url)
      .pipe(finalize(() => this.loading$.set(false)))
      .subscribe({
        next: (result: EmployeeSelectedResponse) => {
          this.employeeSelected$.set(result);
        }
      });
  }
}
