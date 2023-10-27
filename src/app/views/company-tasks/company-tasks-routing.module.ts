import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTaskListComponent,
    data: { title: 'Lista de tareas' }
  },
  {
    path: 'create',
    component: CompanyTaskCreateComponent,
    data: { title: 'Crear nueva tareas' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTaskRoutingModule {}
