import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { BadRequest } from '@aw/models/api/_index';

@Component({
  selector: 'aw-employee-edit',
  templateUrl: './employee-edit.component.html'
})
export class EmployeeEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;

  form: FormGroup = this.fb.group({});
  badRequest: BadRequest | undefined;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrls.employees.employeeList)
      .add('Editar', SiteUrls.employees.employeeEdit, '', false);
  }

  private buildForm(): void {}
}
