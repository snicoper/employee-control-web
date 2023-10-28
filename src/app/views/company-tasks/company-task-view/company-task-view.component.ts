import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';

@Component({
  selector: 'aw-company-task-view',
  templateUrl: './company-task-view.component.html'
})
export class CompanyTaskViewComponent {
  private readonly route = inject(ActivatedRoute);

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyTaskId: number;

  constructor() {
    this.companyTaskId = Number(this.route.snapshot.paramMap.get('id'));
    this.setBreadcrumb();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrls.companyTasks.list).add('Detalles', SiteUrls.companyTasks.details, '', false);
  }
}
