import { Routes } from '@angular/router';

import { AssignHolidaysComponent } from './assign-holidays/assign-holidays.component';
import { ManageHolidaysDetailsComponent } from './manage-holidays-details/manage-holidays-details.component';
import { ManageHolidaysComponent } from './manage-holidays-list/manage-holidays.component';

export const routes: Routes = [
  { path: '', component: ManageHolidaysComponent },
  { path: 'assign', component: AssignHolidaysComponent },
  { path: ':id/details', component: ManageHolidaysDetailsComponent }
];
