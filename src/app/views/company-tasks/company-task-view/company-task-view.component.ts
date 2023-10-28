import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbCollection } from '@aw/components/breadcrumb/breadcrumb-collection';
import { SiteUrls } from '@aw/core/urls/site-urls';
import { CompanyTaskSelectedService } from './company-task-selected.service';

@Component({
  selector: 'aw-company-task-view',
  templateUrl: './company-task-view.component.html'
})
export class CompanyTaskViewComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly companyTaskSelectedService = inject(CompanyTaskSelectedService);

  readonly companyTask = computed(() => this.companyTaskSelectedService.companyTaskSelected());

  readonly breadcrumb = new BreadcrumbCollection();
  readonly companyTaskId: string;

  constructor() {
    this.companyTaskId = this.route.snapshot.paramMap.get('id') as string;
    this.setBreadcrumb();
    this.companyTaskSelectedService.loadData(this.companyTaskId);
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Tareas', SiteUrls.companyTasks.list).add('Detalles', SiteUrls.companyTasks.details, '', false);
  }
}
