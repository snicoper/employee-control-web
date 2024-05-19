import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { BadRequest } from '../../../models/bad-request';
import { User } from '../../../models/entities/user.model';
import { ResultValue } from '../../../models/result-response.model';
import { HttpClientApiService } from '../../../services/api/http-client-api.service';
import { EmployeeHolidaysDetailsResponse } from './employee-holidays-details-response.model';

@Component({
  selector: 'aw-employee-holidays-details',
  templateUrl: './employee-holidays-details.component.html',
  standalone: true,
  imports: [MatCardModule, PageBaseComponent, PageHeaderComponent]
})
export class EmployeeHolidaysDetailsComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly httpClientApiService = inject(HttpClientApiService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;
  readonly year: number;

  employee!: User;
  employeeHoliday!: EmployeeHolidaysDetailsResponse;
  loadingData = true;

  form: FormGroup = this.formBuilder.group({});
  badRequest: BadRequest | undefined;
  submitted = false;
  loadingForm = false;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('employeeId') as string;
    this.year = parseInt(this.route.snapshot.paramMap.get('year') as string);

    this.setBreadcrumb();
    this.loadData();
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Vacaciones de empleados', SiteUrl.companyHolidays.employees, '')
      .add(`Detalles ${this.year}`, SiteUrl.companyHolidays.details, '', false);
  }

  private loadData(): void {
    this.loadingData = true;

    const employeeHolidaysUrl = CommonUtils.urlReplaceParams(
      ApiUrl.employeeHolidays.getOrCreateEmployeeHolidaysByYearAndEmployeeId,
      {
        year: this.year.toString(),
        employeeId: this.employeeId
      }
    );

    const employeesUrl = CommonUtils.urlReplaceParams(ApiUrl.employees.getEmployeeById, { id: this.employeeId });

    type resultResponse = {
      employeeHoliday$: ResultValue<EmployeeHolidaysDetailsResponse>;
      employee$: ResultValue<User>;
    };

    forkJoin({
      employeeHoliday$:
        this.httpClientApiService.get<ResultValue<EmployeeHolidaysDetailsResponse>>(employeeHolidaysUrl),
      employee$: this.httpClientApiService.get<ResultValue<User>>(employeesUrl)
    })
      .pipe(finalize(() => (this.loadingData = false)))
      .subscribe({
        next: (result: resultResponse) => {
          this.employeeHoliday = result.employeeHoliday$.value;
          this.employee = result.employee$.value;

          this.buildForm();
        }
      });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      totalDays: [this.employeeHoliday.totalDays, [Validators.required, Validators.min(1)]],
      consumedDays: [{ value: this.employeeHoliday.consumedDays, disabled: true }],
      available: [{ value: this.employeeHoliday.available, disabled: true }]
    });
  }
}
