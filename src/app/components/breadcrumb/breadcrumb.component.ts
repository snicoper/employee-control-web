import { Component, Input } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { BreadcrumbCollection } from './breadcrumb-collection';

@Component({
  selector: 'aw-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {
  @Input() breadcrumb = new BreadcrumbCollection();

  constructor(private sidebarService: SidebarService) {}
}
