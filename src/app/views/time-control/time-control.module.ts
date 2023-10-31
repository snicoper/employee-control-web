import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwProgressModule } from '@aw/components/progress/aw-progress.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { TimeControlRoutingModule } from './time-control-routing.module';
import { TimeControlComponent } from './time-control.component';

@NgModule({
  declarations: [TimeControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    TimeControlRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwProgressModule,
    AwButtonsModule
  ]
})
export class TimeControlModule {}
