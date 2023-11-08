import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls } from '@aw/core/urls/_index';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { urlReplaceParams } from '@aw/core/utils/_index';
import { BadRequest } from '@aw/models/_index';
import { JwtService } from '@aw/services/_index';
import { EmployeesApiService } from '@aw/services/api/_index';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { InviteEmployeeRequest } from './employee-invite-request.model';

@Component({
  selector: 'aw-employee-invite',
  templateUrl: './employee-invite.component.html'
})
export class EmployeeInviteComponent {
  private readonly fb = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly jwtService = inject(JwtService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);

  readonly breadcrumb = new BreadcrumbCollection();

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  formInputTypes = FormInputTypes;
  submitted = false;
  loading = false;
  siteUrls = SiteUrls;

  constructor() {
    this.setBreadcrumb();
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
      .post<InviteEmployeeRequest, string>(inviteEmployeeRequest, ApiUrls.employees.inviteEmployee)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: string) => {
          const url = urlReplaceParams(SiteUrls.employees.details, { id: result });
          this.toastrService.success('Invitación enviada con éxito.');
          this.router.navigateByUrl(url);
        },
        error: (error: HttpErrorResponse) => {
          this.badRequest = error.error as BadRequest;
        }
      });
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrls.employees.list)
      .add('Invitar empleado', SiteUrls.employees.invite, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]]
    });
  }
}
