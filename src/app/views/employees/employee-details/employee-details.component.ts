import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteUrls } from '@aw/core/urls/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { EmployeesApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { roleToText } from './../../../core/types/roles';
import { EmployeeDetailsResponse } from './employee-details-response.model';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toastrService = inject(ToastrService);

  employee: EmployeeDetailsResponse | undefined = undefined;
  siteUrls = SiteUrls;
  loading = false;
  roleToText = roleToText;

  private readonly employeeId: string;

  constructor() {
    const employeeId = this.route.snapshot.paramMap.get('id');

    this.employeeId = employeeId ?? '';

    this.loadEmployee();
  }

  handleDeactivateEmployee(): void {
    const data = { employeeId: this.employee?.id };
    this.employeesApiService.post<typeof data, ResultResponse>(data, ApiUrls.employees.deactivateEmployee).subscribe({
      next: () => {
        this.toastrService.success('Usuario desactivado con éxito');
        this.loadEmployee();
      }
    });
  }

  handleActivateEmployee(): void {
    const data = { employeeId: this.employee?.id };
    this.employeesApiService.post<typeof data, ResultResponse>(data, ApiUrls.employees.activateEmployee).subscribe({
      next: () => {
        this.toastrService.success('Usuario activado con éxito');
        this.loadEmployee();
      }
    });
  }

  private loadEmployee(): void {
    this.loading = true;
    const url = SiteUrls.replace(SiteUrls.employees.employeeDetails, { id: this.employeeId });

    this.employeesApiService
      .get<EmployeeDetailsResponse>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: EmployeeDetailsResponse) => {
          this.employee = result;
        }
      });
  }
}
