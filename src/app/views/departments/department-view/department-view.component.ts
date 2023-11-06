import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/_index';
import { DepartmentSelectedService } from './department-selected.service';

@Component({
  selector: 'aw-department-view',
  templateUrl: './department-view.component.html'
})
export class DepartmentViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly departmentSelectedService = inject(DepartmentSelectedService);

  readonly departmentSelected = computed(() => this.departmentSelectedService.departmentSelected());
  readonly loadingDepartmentSelected = computed(() => this.departmentSelectedService.loadingDepartmentSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly departmentId: string;

  constructor() {
    this.departmentId = this.route.snapshot.paramMap.get('id') as string;
    this.departmentSelectedService.loadDepartmentById(this.departmentId);
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb
      .add('Departamentos', SiteUrls.departments.list)
      .add('Detalles', SiteUrls.departments.details, '', false);
  }
}
