import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeControlComponent } from './time-control.component';

export const routes: Routes = [
  {
    path: '',
    component: TimeControlComponent,
    data: { title: 'Control de tiempos' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeControlRoutingModule {}
