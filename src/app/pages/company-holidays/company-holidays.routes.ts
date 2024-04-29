import { Routes } from '@angular/router';

import { EmployeeHolidaysComponent } from './employee-holidays/employee-holidays.component';
import { HolidaysClaimComponent } from './holidays-claim/holidays-claim.component';
import { HolidaysDetailsComponent } from './holidays-details/holidays-details.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeHolidaysComponent,
    title: ''
  },
  {
    path: 'claims',
    component: HolidaysClaimComponent,
    title: ''
  },
  {
    path: ':id/details',
    component: HolidaysDetailsComponent,
    title: ''
  }
];
