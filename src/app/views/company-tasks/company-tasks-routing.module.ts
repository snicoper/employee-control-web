import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';
import { CompanyTaskUpdateComponent } from './company-task-update/company-task-update.component';
import { CompanyTaskViewComponent } from './company-task-view/company-task-view.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTaskListComponent,
    title: 'Lista de tareas'
  },
  {
    path: 'create',
    component: CompanyTaskCreateComponent,
    title: 'Crear nueva tareas'
  },
  {
    path: ':id',
    component: CompanyTaskViewComponent,
    title: 'Detalles de tarea'
  },
  {
    path: ':id/update',
    component: CompanyTaskUpdateComponent,
    title: 'Editar tarea'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTaskRoutingModule {}
