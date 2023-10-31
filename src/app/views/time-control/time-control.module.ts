import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { TimeControlRoutingModule } from './time-control-routing.module';
import { TimeControlComponent } from './time-control.component';

@NgModule({
  declarations: [TimeControlComponent],
  imports: [CommonModule, FormsModule, TimeControlRoutingModule, AwViewsModule, AwCardsModule]
})
export class TimeControlModule {}
