import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'aw-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrl: './employee-calendar.component.scss',
  standalone: true,
  imports: [MatSidenavModule, PageBaseComponent, PageHeaderComponent]
})
export class EmployeeCalendarComponent {
  private readonly sidenavService = inject(SidenavService);

  toggleSidenavToolbar(): void {
    this.sidenavService.toggleSidenavToolbarState();
  }
}
