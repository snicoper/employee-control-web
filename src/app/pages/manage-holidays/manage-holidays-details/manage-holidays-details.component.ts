import { Component } from '@angular/core';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';

@Component({
  selector: 'aw-manage-holidays-details',
  templateUrl: './manage-holidays-details.component.html',
  styleUrl: './manage-holidays-details.component.scss',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class ManageHolidaysDetailsComponent {}
