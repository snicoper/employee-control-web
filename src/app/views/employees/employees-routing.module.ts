import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { InviteEmployeeComponent } from './invite-employee/invite-employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    data: { title: 'Lista de empleados' }
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
