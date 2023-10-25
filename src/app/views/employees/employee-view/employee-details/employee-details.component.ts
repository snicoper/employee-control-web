import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { roleToText } from '@aw/core/types/roles';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { EmployeesApiService } from '@aw/services/api/employees-api.service';
import { ToastrService } from 'ngx-toastr';
import { EmployeeSelectedService } from '../employee-selected.service';

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
  urlEdit: string = '';

  ngOnInit(): void {
    this.urlEdit = this.siteUrls.replace(SiteUrls.employees.employeeEdit, { id: this.employeeId });
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
