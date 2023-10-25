import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { InviteEmployeeComponent } from './invite-employee/invite-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    data: { title: 'Lista de empleados' }
  },
  {
    path: 'details/:id',
    component: EmployeeViewComponent,
    data: { title: 'Detalles de empleado' }
  },
  {
    path: 'edit/:id',
    component: EmployeeEditComponent,
    data: { title: 'Editar empleado' }
  },
  {
    path: 'invite',
    component: InviteEmployeeComponent,
    data: { title: 'Invitar a empleado' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
