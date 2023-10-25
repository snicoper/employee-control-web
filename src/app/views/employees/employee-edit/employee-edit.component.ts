import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { FormInputTypes } from '@aw/core/types/_index';
import { ApiUrls } from '@aw/core/urls/api-urls';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { BadRequest, Employee } from '@aw/models/api/_index';
import { EmployeesApiService } from '@aw/services/api/_index';
import { finalize } from 'rxjs';

@Component({
  selector: 'aw-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly employeesApiService = inject(EmployeesApiService);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;
  formTypes = FormInputTypes;
  loading = false;
  submitted = false;
  employee: Employee | undefined;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadEmployee();
    this.setBreadcrumb();
    this.buildForm();
  }

  handleSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const employee = this.form.value as Employee;

    this.employeesApiService.post<Employee, undefined>(employee);
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrls.employees.employeeList)
      .add('Editar', SiteUrls.employees.employeeEdit, '', false);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]]
    });
  }

  private loadEmployee(): void {
    this.loading = true;
    const url = ApiUrls.replace(ApiUrls.employees.getEmployeeById, { id: this.employeeId });
    this.employeesApiService
      .get<Employee>(url)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: Employee) => {
          this.employee = result;
        }
      });
  }
}
