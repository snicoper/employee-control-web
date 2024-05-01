import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { EmployeeHoliday } from '../../../models/entities/employee-holiday.model';
import { EmployeeHolidaysApiService } from '../../../services/api/employee-holidays-api.service';

@Component({
  selector: 'aw-employee-holidays-details',
  templateUrl: './employee-holidays-details.component.html',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class EmployeeHolidaysDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeHolidaysApiService = inject(EmployeeHolidaysApiService);

  readonly employeeId: string;
  readonly year: number;

  employeeHoliday!: EmployeeHoliday;
  loadingEmployeeHoliday = true;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId') as string;
    this.year = parseInt(this.route.snapshot.paramMap.get('year') as string);

    this.loadEmployeeHoliday();
  }

  private loadEmployeeHoliday(): void {
    this.loadingEmployeeHoliday = true;

    const url = CommonUtils.urlReplaceParams(ApiUrl.employeeHolidays.getOrCreateEmployeeHolidaysByYearAndEmployeeId, {
      year: this.year.toString(),
      employeeId: this.employeeId
    });

    this.employeeHolidaysApiService
      .get<EmployeeHoliday>(url)
      .pipe(finalize(() => (this.loadingEmployeeHoliday = false)))
      .subscribe({
        next: (result: EmployeeHoliday) => {
          this.employeeHoliday = result;
        }
      });
  }
}
