import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { EmployeeSelectedService } from './employee-selected.service';

@Component({
  selector: 'aw-employee-view',
  templateUrl: './employee-view.component.html'
})
export class EmployeeViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly employeeSelectedService = inject(EmployeeSelectedService);

  readonly employee = computed(() => this.employeeSelectedService.employeeSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly employeeId: string;

  constructor() {
    this.employeeId = this.route.snapshot.paramMap.get('id') ?? '';
    this.setBreadcrumb();
    this.employeeSelectedService.loadEmployeeById(this.employeeId);
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Empleados', SiteUrls.employees.employeeList)
      .add('Detalles', SiteUrls.employees.employeeDetails, '', false);
  }
}