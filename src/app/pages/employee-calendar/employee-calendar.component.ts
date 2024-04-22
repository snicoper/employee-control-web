import { Component } from '@angular/core';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';

@Component({
  selector: 'aw-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrl: './employee-calendar.component.scss',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class EmployeeCalendarComponent {}
