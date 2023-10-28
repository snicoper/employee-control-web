import { Component, Input, computed, inject } from '@angular/core';
import { Roles, roleToHumanReadable } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { ResultResponse } from '@aw/models/_index';
import { JwtService } from '@aw/services/_index';
import { EmployeesApiService } from '@aw/services/api/_index';
import { DateTime } from 'luxon';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { EmployeeSelectedService } from '../employee-selected.service';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent {
  @Input({ required: true }) employeeId = '';

  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly toastrService = inject(ToastrService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly jwtService = inject(JwtService);

  readonly employee = computed(() => this.employeeSelectedService.employeeSelected());
  readonly employeeRoles = computed(() => this.employeeSelectedService.employeeSelectedRoles());
  readonly loadingEmployee = computed(() => this.employeeSelectedService.loadingEmployee());
  readonly loadingEmployeeRoles = computed(() => this.employeeSelectedService.loadingEmployeeRoles());

  readonly roleToHumanReadable = roleToHumanReadable;
  readonly siteUrls = SiteUrls;
  readonly roles = Roles;
  readonly dateShort = DateTime.DATE_SHORT;

  loadingUpdateRole = false;
  loadingUpdateActive = false;

  /** Texto botón eliminar role. */
  get btnTextDeleteRole(): string {
    return `Eliminar ${roleToHumanReadable(Roles.humanResources)}`;
  }

  /** Texto botón añadir role. */
  get btnTextAddRole(): string {
    return `Establecer ${roleToHumanReadable(Roles.humanResources)}`;
  }

  /** Empleado seleccionado es humanResources. */
  get isHumanResources(): boolean {
    const index = this.employeeRoles()?.findIndex((role) => role.name === Roles.humanResources);

    return index !== undefined && index >= 0;
  }

  /** Empleado seleccionado es enterpriseAdministrator. */
  get isEnterpriseAdministrator(): boolean {
    const index = this.employeeRoles()?.findIndex((role) => role.name === Roles.enterpriseAdministrator);

    return index !== undefined && index >= 0;
  }

  /** Comprueba si el usuario actual es igual al empleado seleccionado. */
  get canUpdateStates(): boolean {
    return this.jwtService.getSid() !== this.employee()?.id;
  }

  /** Url para editar empleado. */
  get urlToEdit(): string {
    return this.siteUrls.replace(SiteUrls.employees.edit, { id: this.employeeId });
  }

  /** Eliminar Role RRHH al empleado. */
  handleRemoveRoleRrhh(): void {
    this.loadingUpdateRole = true;
    const data = { employeeId: this.employeeId };
    const url = this.generateApiUrl(ApiUrls.employees.removeRoleHumanResources);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateRole = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Rol establecido con éxito.');
            this.employeeSelectedService.loadData(this.employeeId);
          }
        }
      });
  }

  /** Añadir role RRHH al empleado. */
  handleAddRoleRrhh(): void {
    this.loadingUpdateRole = true;
    const data = { employeeId: this.employeeId };
    const url = this.generateApiUrl(ApiUrls.employees.addRoleHumanResources);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateRole = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Rol eliminado con éxito.');
            this.employeeSelectedService.loadData(this.employeeId);
          }
        }
      });
  }

  /** Establecer estado Active a false del empleado. */
  handleDeactivateEmployee(): void {
    this.loadingUpdateActive = true;
    const data = { employeeId: this.employeeId };
    const url = this.generateApiUrl(ApiUrls.employees.deactivateEmployee);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateActive = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Usuario desactivado con éxito');
          this.employeeSelectedService.loadData(this.employeeId);
        }
      });
  }

  /** Establecer estado Active a true del empleado. */
  handleActivateEmployee(): void {
    this.loadingUpdateActive = true;
    const data = { employeeId: this.employeeId };
    const url = this.generateApiUrl(ApiUrls.employees.activateEmployee);

    this.employeesApiService
      .put<typeof data, ResultResponse>(data, url)
      .pipe(finalize(() => (this.loadingUpdateActive = false)))
      .subscribe({
        next: () => {
          this.toastrService.success('Usuario activado con éxito');
          this.employeeSelectedService.loadData(this.employeeId);
        }
      });
  }

  /** Wrapper para generar URLs ,de edición de estados. */
  private generateApiUrl(partialUrl: string): string {
    return ApiUrls.replace(partialUrl, { id: this.employeeId });
  }
}
