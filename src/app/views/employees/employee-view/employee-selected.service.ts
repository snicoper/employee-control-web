import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { UserRole } from '@aw/models/entities/user-role.model';
import { User } from '@aw/models/entities/user.model';
import { EmployeesApiService } from '@aw/services/api/employees-api.service';
import { finalize } from 'rxjs';

@Injectable()
export class EmployeeSelectedService {
  private readonly employeeSelected$ = signal<User | null>(null);
  private readonly employeeSelectedRoles$ = signal<UserRole[]>([]);
  private readonly loadingEmployee$ = signal(false);
  private readonly loadingEmployeeRoles$ = signal(false);

  private readonly employeesApiService = inject(EmployeesApiService);

  readonly employeeSelected = computed(() => this.employeeSelected$());
  readonly employeeSelectedRoles = computed(() => this.employeeSelectedRoles$());
  readonly loadingEmployee = computed(() => this.loadingEmployee$());
  readonly loadingEmployeeRoles = computed(() => this.loadingEmployeeRoles$());

  loadData(employeeId: string): void {
    this.loadingEmployee$.set(true);
    this.loadingEmployeeRoles$.set(true);

    const urlEmployee = SiteUrls.replace(ApiUrls.employees.getEmployeeById, { id: employeeId });
    const urlEmployeeRoles = `${urlEmployee}/roles`;

    this.employeesApiService
      .get<User>(urlEmployee)
      .pipe(finalize(() => this.loadingEmployee$.set(false)))
      .subscribe({
        next: (result: User) => {
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
