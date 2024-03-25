import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  {
    path: '403',
    component: Error403Component,
    title: 'Sin autorización'
  },
  {
    path: '404',
    component: Error404Component,
    title: 'Página no encontrada'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule {}
