import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls, SiteUrls } from '@aw/core/urls/_index';
import { BadResponse } from '@aw/models/api/_index';
import { ResultResponse } from '@aw/models/api/result-response.model';
import { EmployeesApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { JwtService } from './../../../services/jwt.service';
import { InviteEmployeeRequest } from './invite-employee-request.model';

@Component({
  selector: 'aw-invite-employee',
  templateUrl: './invite-employee.component.html'
})
export class InviteEmployeeComponent {
  private readonly fb = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  form: FormGroup = this.fb.group({});
  badRequest: BadResponse | undefined;
  formInputTypes = FormInputTypes;
  siteUrls = SiteUrls;
  submitted = false;
  loading = false;

  constructor() {
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    // Continue.
    const inviteEmployeeRequest = this.form.value as InviteEmployeeRequest;
    inviteEmployeeRequest.companyId = this.jwtService.getCompanyId();

    this.employeesApiService
      .post<InviteEmployeeRequest, ResultResponse>(inviteEmployeeRequest, ApiUrls.employees.inviteEmployee)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultResponse) => {
          if (result.succeeded) {
            this.toastrService.success('Invitación enviada con éxito.');
            this.router.navigateByUrl(SiteUrls.employees.employeeList);

            return;
          }
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error as BadResponse;
        }
      });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });
  }
}
