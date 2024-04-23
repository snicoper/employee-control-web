import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../../../services/sidenav.service';
import { EmployeeCalendarToolbarService } from './employee-calendar-toolvar.service';

@Component({
  selector: 'aw-employee-calendar-toolbar',
  templateUrl: './employee-calendar-toolbar.component.html',
  styleUrl: './employee-calendar-toolbar.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule]
})
export class EmployeeCalendarToolbarComponent {
  private readonly employeeCalendarToolbarService = inject(EmployeeCalendarToolbarService);
  private readonly sidenavService = inject(SidenavService);

  readonly calendarDatesSelected = computed(() => this.employeeCalendarToolbarService.calendarDatesSelected());

  yearSelected = input.required<number>();

  handleCloseToolbar(): void {
    this.sidenavService.toggleSidenavToolbarState();
  }
}
