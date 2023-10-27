import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskDetailsComponent } from './company-task-details/company-task-details.component';
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
  },
  {
    path: 'details/:id',
    component: CompanyTaskDetailsComponent,
    data: { title: 'Detalles de tarea' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTaskRoutingModule {}
