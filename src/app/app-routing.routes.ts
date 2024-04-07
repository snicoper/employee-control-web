import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from './core/types/roles';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.routes)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./pages/accounts/accounts.routes').then((m) => m.routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.routes)
  },
  {
    path: 'category-absences',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/category-absences/category-absences.routes').then((m) => m.routes)
  },
  {
    path: 'company-holidays-manage',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-holidays-manage/company-holidays-manage.routes').then((m) => m.routes)
  },
  {
    path: 'company-settings',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-settings/company-settings.routes').then((m) => m.routes)
  },
  {
    path: 'tasks',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/company-tasks/company-tasks.routes').then((m) => m.routes)
  },
  {
    path: 'dashboard',
    data: { roles: [Roles.Employee] },
    loadChildren: () => import('./pages/dashboard/dashboard.routes').then((m) => m.routes)
  },
  {
    path: 'departments',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/departments/departments.routes').then((m) => m.routes)
  },
  {
    path: 'employees',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/employees/employees.routes').then((m) => m.routes)
  },
  {
    path: 'errors',
    loadChildren: () => import('./pages/errors/errors.routes').then((m) => m.routes)
  },
  {
    path: 'time-control-records',
    data: { roles: [Roles.HumanResources] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/time-control-records/time-control-records.routes').then((m) => m.routes)
  },
  {
    path: 'times-control-progress',
    data: { roles: [Roles.Employee] },
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/times-control-progress/times-control-progress.routes').then((m) => m.routes)
  },
  {
    path: '**',
    redirectTo: '/errors/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
