import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { BtnLoadingComponent } from '../../../../../components/buttons/btn-loading/btn-loading.component';
import { Roles } from '../../../../../core/types/roles';
import { ApiUrls } from '../../../../../core/urls/api-urls';
import { CommonUtils } from '../../../../../core/utils/common-utils';
import { ResultResponse } from '../../../../../models/result-response.model';
import { EmployeesApiService } from '../../../../../services/api/employees-api.service';
import { EmployeeSelectedService } from '../../employee-selected.service';
import { EmployeeRolesRequest } from './employee-roles-request.model';

@Component({
  selector: 'aw-employee-roles-edit',
  templateUrl: './employee-roles-edit.component.html',
  standalone: true,
  imports: [FormsModule, BtnLoadingComponent]
})
export class EmployeeRolesEditComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);
  private readonly toastrService = inject(ToastrService);
  private readonly bsModalRef = inject(BsModalRef);

  readonly employeeSelected = computed(() => this.employeeSelectedService.employeeSelected());

  isAdmin = false;
  isStaff = false;
  isHumanResources = false;
  isEmployee = false;

  roles = Roles;
  loading = false;

  get fullName(): string {
    return `${this.employeeSelected()?.firstName} ${this.employeeSelected()?.lastName}`;
  }

  constructor() {
    this.isAdmin = this.employeeSelectedService.isInRole(Roles.Admin);
    this.isStaff = this.employeeSelectedService.isInRole(Roles.Staff);
    this.isHumanResources = this.employeeSelectedService.isInRole(Roles.HumanResources);
    this.isEmployee = this.employeeSelectedService.isInRole(Roles.Employee);
  }

  /** Los roles son jerárquicos */
  handChangeValue(roleName: string, value: boolean): void {
    // Si desactiva HumanResources, también desactiva EnterpriseStaff.
    if (Roles.HumanResources === roleName && !value && this.isStaff) {
      this.isStaff = false;
    }

    // Si activa Staff, también activa HumanResources.
    if (Roles.Staff === roleName && value && !this.isHumanResources) {
      this.isHumanResources = true;
    }
  }

  handleClose(): void {
    this.bsModalRef.hide();
  }

  handleSaveChanges(): void {
    this.loading = true;
    const employeeId = this.employeeSelected()?.id as string;
    const url = CommonUtils.urlReplaceParams(ApiUrls.employees.updateEmployeeRoles, { id: employeeId });
    const rolesToAdd: EmployeeRolesRequest = { employeeId: employeeId, rolesToAdd: [] };

    if (this.isAdmin) {
      rolesToAdd.rolesToAdd.push(Roles.Admin);
    }

    if (this.isStaff) {
      rolesToAdd.rolesToAdd.push(Roles.Staff);
    }

    if (this.isHumanResources) {
      rolesToAdd.rolesToAdd.push(Roles.HumanResources);
    }

    rolesToAdd.rolesToAdd.push(Roles.Employee);

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
