import { Component } from '@angular/core';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';

@Component({
  selector: 'aw-assign-holidays',
  templateUrl: './assign-holidays.component.html',
  styleUrl: './assign-holidays.component.scss',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class AssignHolidaysComponent {}
