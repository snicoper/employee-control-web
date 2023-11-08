import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeControlRecordListComponent } from './time-control-record-list/time-control-record-list.component';

export const routes: Routes = [
  {
    path: '',
    component: TimeControlRecordListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeControlRecordsRoutingModule {}
