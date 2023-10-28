import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { UserRole } from '@aw/models/entities/user-role.model';
import { EmployeesApiService } from '@aw/services/api/employees-api.service';
import { finalize } from 'rxjs';
import { EmployeeSelectedResponse } from './employee-selected-response.model';

@Injectable()
export class EmployeeSelectedService {
  private readonly employeeSelected$ = signal<EmployeeSelectedResponse | undefined>(undefined);
  private readonly employeeSelectedRoles$ = signal<UserRole[] | undefined>(undefined);
  private readonly loadingEmployee$ = signal(false);
  private readonly loadingEmployeeRoles$ = signal(false);

  private readonly employeesApiService = inject(EmployeesApiService);

  readonly employeeSelected = computed(() => this.employeeSelected$());
  readonly employeeSelectedRoles = computed(() => this.employeeSelectedRoles$());
  readonly loadingEmployee = computed(() => this.loadingEmployee$());
  readonly loadingEmployeeRoles = computed(() => this.loadingEmployeeRoles$());

  loadEmployeeById(employeeId: string): void {
    this.loadingEmployee$.set(true);
    this.loadingEmployeeRoles$.set(true);

    const urlEmployee = SiteUrls.replace(ApiUrls.employees.getEmployeeById, { id: employeeId });
    const urlEmployeeRoles = `${urlEmployee}/roles`;

    this.employeesApiService
      .get<EmployeeSelectedResponse>(urlEmployee)
      .pipe(finalize(() => this.loadingEmployee$.set(false)))
      .subscribe({
        next: (result: EmployeeSelectedResponse) => {
          this.employeeSelected$.set(result);
        }
      });

    this.employeesApiService
      .get<UserRole[]>(urlEmployeeRoles)
      .pipe(finalize(() => this.loadingEmployeeRoles$.set(false)))
      .subscribe({
        next: (result: UserRole[]) => {
          this.employeeSelectedRoles$.set(result);
        }
      });
  }
}
