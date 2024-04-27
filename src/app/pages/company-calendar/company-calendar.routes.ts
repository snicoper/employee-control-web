import { Routes } from '@angular/router';
import { CompanyCalendarComponent } from './company-calendar.component';
import { CompanyCalendarDetailsComponent } from './company-calendars-view/company-calendar-details/company-calendar-details.component';
import { CompanyCalendarListComponent } from './company-calendars-view/company-calendar-list/company-calendar-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CompanyCalendarComponent,
    title: 'Edición días festivos'
  },
  {
    path: 'list',
    component: CompanyCalendarListComponent,
    title: 'Lista de calendarios'
  },
  {
    path: ':id/details',
    component: CompanyCalendarDetailsComponent,
    title: 'Detalles de calendario'
  }
];
