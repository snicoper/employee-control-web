import { Component } from '@angular/core';
import { SiteUrls } from '@aw/core/urls/site-urls';

@Component({
  selector: 'aw-category-absence-list',
  templateUrl: './category-absence-list.component.html'
})
export class CategoryAbsenceListComponent {
  siteUrls = SiteUrls;
}
