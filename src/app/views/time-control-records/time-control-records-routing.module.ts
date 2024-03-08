import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeControlRecordCreateComponent } from './time-control-record-create/time-control-record-create.component';
import { TimeControlRecordDetailsComponent } from './time-control-record-datails/time-control-record-details.component';
import { TimeControlRecordListComponent } from './time-control-record-list/time-control-record-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TimeControlRecordListComponent,
    data: { title: 'Registro de tiempos' }
  },
  {
    path: 'create',
    component: TimeControlRecordCreateComponent,
    data: { title: 'Añadir un registro de tiempo' }
  },
  {
    path: ':id',
    component: TimeControlRecordDetailsComponent,
    data: { title: 'Detalles de registro de tiempo' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeControlRecordsRoutingModule {}
