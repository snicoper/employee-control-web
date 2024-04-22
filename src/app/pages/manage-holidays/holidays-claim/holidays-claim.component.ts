import { Component } from '@angular/core';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';

@Component({
  selector: 'aw-holidays-claim',
  templateUrl: './holidays-claim.component.html',
  styleUrl: './holidays-claim.component.scss',
  standalone: true,
  imports: [PageBaseComponent, PageHeaderComponent]
})
export class HolidaysClaimComponent {}
