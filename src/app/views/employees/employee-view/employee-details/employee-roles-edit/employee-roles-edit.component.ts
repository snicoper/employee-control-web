import { Component, computed, inject } from '@angular/core';
import { Roles } from '@aw/core/types/roles';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { ResultResponse } from '@aw/models/result-response.model';
import { EmployeesApiService } from '@aw/services/api/_index';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { EmployeeSelectedService } from '../../employee-selected.service';
import { EmployeeRolesRequest } from './employee-roles-request.model';

@Component({
  selector: 'aw-employee-roles-edit',
  templateUrl: './employee-roles-edit.component.html'
})
export class EmployeeRolesEditComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly bsModalRef = inject(BsModalRef);
  private readonly toastrService = inject(ToastrService);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  isEnterpriseAdmin = false;
  isEnterpriseStaff = false;
  isHumanResources = false;
  isEmployee = false;
  loading = false;

  get fullName(): string {
    return `${this.employeeSelected()?.firstName} ${this.employeeSelected()?.lastName}`;
  }

  constructor() {
    this.isEnterpriseAdmin = this.employeeSelectedService.isInRole(Roles.enterpriseAdmin);
    this.isEnterpriseStaff = this.employeeSelectedService.isInRole(Roles.enterpriseStaff);
    this.isHumanResources = this.employeeSelectedService.isInRole(Roles.humanResources);
    this.isEmployee = this.employeeSelectedService.isInRole(Roles.employee);
  }

  handleClose(): void {
    this.bsModalRef.hide();
  }

  handleSaveChanges(): void {
    this.loading = true;
    const employeeId = this.employeeSelected()?.id as string;
    const url = ApiUrls.replace(ApiUrls.employees.updateEmployeeRoles, { id: employeeId });
    const rolesToAdd: EmployeeRolesRequest = { employeeId: employeeId, roles: [] };

    if (this.isEnterpriseAdmin) {
      rolesToAdd.roles.push(Roles.enterpriseAdmin);
    }

    if (this.isEnterpriseStaff) {
      rolesToAdd.roles.push(Roles.enterpriseStaff);
    }

    if (this.isHumanResources) {
      rolesToAdd.roles.push(Roles.humanResources);
    }

    rolesToAdd.roles.push(Roles.employee);

    this.employeesApiService
      .put<EmployeeRolesRequest, ResultResponse>(rolesToAdd, url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          if (result.succeeded) {
            this.bsModalRef.hide();
            this.toastrService.success('Roles actualizados con éxito');
            this.employeeSelectedService.loadData(employeeId);
          }
        }
      });
  }
}
