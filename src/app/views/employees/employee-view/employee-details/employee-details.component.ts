import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { Roles, roleToText } from '@aw/core/types/roles';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { EmployeesApiService } from '@aw/services/api/employees-api.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { EmployeeSelectedService } from '../employee-selected.service';
import { UpdateRoleRequest } from './update-role-request.model';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent implements OnInit {
  @Input({ required: true }) employeeId = '';

  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);

  readonly employee = computed(() => this.employeeSelectedService.employeeSelected());
  readonly loading = computed(() => this.employeeSelectedService.loading());

  readonly roleToText = roleToText;
  readonly siteUrls = SiteUrls;
  readonly roles = Roles;
  loadingUpdateRole = false;
  urlEdit: string = '';

  ngOnInit(): void {
    this.urlEdit = this.siteUrls.replace(SiteUrls.employees.employeeEdit, { id: this.employeeId });
  }

  btnTextDeleteRole(): string {
    return `Eliminar ${roleToText(Roles.humanResources)}`;
  }

  btnTextAddRole(): string {
    return `Establecer ${roleToText(Roles.humanResources)}`;
  }

  isHumanResources(): boolean {
    const index = this.employee()?.userRoles.findIndex((role) => role === Roles.humanResources);

    return index !== undefined && index >= 0;
  }

  isEnterpriseAdministrator(): boolean {
    const index = this.employee()?.userRoles.findIndex((role) => role === Roles.enterpriseAdministrator);

    return index !== undefined && index >= 0;
  }

  handleRemoveRoleRrhh(): void {
    this.loadingUpdateRole = true;
    const url = ApiUrls.replace(ApiUrls.employees.removeRoleHumanResources, { id: this.employeeId });
    const updateRoleRequest = { employeeId: this.employeeId };

    this.employeesApiService
      .post<UpdateRoleRequest, ResultResponse>(updateRoleRequest, url)
      .pipe(finalize(() => (this.loadingUpdateRole = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Rol establecido con éxito.');
            this.employeeSelectedService.loadEmployeeById(this.employeeId);
          }
        }
      });
  }

  handleAddRoleRrhh(): void {
    this.loadingUpdateRole = true;
    const url = ApiUrls.replace(ApiUrls.employees.addRoleHumanResources, { id: this.employeeId });
    const updateRoleRequest = { employeeId: this.employeeId };

    this.employeesApiService
      .post<UpdateRoleRequest, ResultResponse>(updateRoleRequest, url)
      .pipe(finalize(() => (this.loadingUpdateRole = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Rol eliminado con éxito.');
            this.employeeSelectedService.loadEmployeeById(this.employeeId);
          }
        }
      });
  }

  handleDeactivateEmployee(): void {
    const data = { employeeId: this.employee()?.id };
    this.employeesApiService.post<typeof data, ResultResponse>(data, ApiUrls.employees.deactivateEmployee).subscribe({
      next: () => {
        this.toastrService.success('Usuario desactivado con éxito');
        this.employeeSelectedService.loadEmployeeById(this.employeeId);
      }
    });
  }

  handleActivateEmployee(): void {
    const data = { employeeId: this.employee()?.id };
    this.employeesApiService.post<typeof data, ResultResponse>(data, ApiUrls.employees.activateEmployee).subscribe({
      next: () => {
        this.toastrService.success('Usuario activado con éxito');
        this.employeeSelectedService.loadEmployeeById(this.employeeId);
      }
    });
  }
}
