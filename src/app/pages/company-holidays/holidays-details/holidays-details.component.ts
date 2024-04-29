import { Component } from '@angular/core';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';

@Component({
  selector: 'aw-holidays-details',
  templateUrl: './holidays-details.component.html',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class HolidaysDetailsComponent {}
