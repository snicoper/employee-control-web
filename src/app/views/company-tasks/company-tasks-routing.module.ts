import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTasksListComponent } from './company-tasks-list/company-tasks-list.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyTasksListComponent,
    data: { title: 'Lista de tareas' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTaskRoutingModule {}
