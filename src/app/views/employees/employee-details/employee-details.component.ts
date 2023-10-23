import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteUrls } from '@aw/core/urls/_index';
import { EmployeesApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';
import { EmployeeDetailsResponse } from './employee-details-response.model';

@Component({
  selector: 'aw-employee-details',
  templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly route = inject(ActivatedRoute);

  employee: EmployeeDetailsResponse | undefined = undefined;
  loading = false;

  private readonly employeeId = '';

  constructor() {
    this.employeeId = this.route.snapshot.params['id'];
    this.loadEmployee();
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
