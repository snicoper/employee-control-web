import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    data: { title: 'Lista de empleados' }
  },
  {
    path: 'invite',
    component: EmployeeInviteComponent,
    data: { title: 'Invitar a empleado' }
  },
  {
    path: ':id/details',
    component: EmployeeViewComponent,
    data: { title: 'Detalles de empleado' }
  },
  {
    path: ':id/edit',
    component: EmployeeEditComponent,
    data: { title: 'Editar empleado' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
