import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { TimeControlRoutingModule } from './time-control-routing.module';
import { TimeControlComponent } from './time-control.component';

@NgModule({
  declarations: [TimeControlComponent],
  imports: [CommonModule, TimeControlRoutingModule, AwViewsModule]
})
export class TimeControlModule {}
