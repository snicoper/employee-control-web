import { Component } from '@angular/core';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';

@Component({
  selector: 'aw-holidays-assign',
  templateUrl: './holidays-assign.component.html',
  styleUrl: './holidays-assign.component.scss',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class HolidaysAssignComponent {}
