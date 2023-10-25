import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { Employee } from '@aw/models/api/user.model';
import { EmployeesApiService } from '@aw/services/api/employees-api.service';
import { finalize } from 'rxjs';

@Injectable()
export class EmployeeSelectedService {
  private readonly employeeSelected$ = signal<Employee | undefined>(undefined);
  private readonly loading$ = signal(false);

  private readonly employeesApiService = inject(EmployeesApiService);

  readonly employeeSelected = computed(() => this.employeeSelected$());
  readonly loading = computed(() => this.loading$());

  loadEmployeeById(employeeId: string): void {
    this.loading$.set(true);
    const url = SiteUrls.replace(ApiUrls.employees.getEmployeeById, { id: employeeId });

    this.employeesApiService
      .get<Employee>(url)
      .pipe(finalize(() => this.loading$.set(false)))
      .subscribe({
        next: (result: Employee) => {
          this.employeeSelected$.set(result);
        }
      });
  }
}
