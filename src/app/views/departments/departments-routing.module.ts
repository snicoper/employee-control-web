import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
    data: { title: 'Lista de departamentos' }
  },
  {
    path: 'create',
    component: DepartmentCreateComponent,
    data: { title: 'Cea departamento' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {}
