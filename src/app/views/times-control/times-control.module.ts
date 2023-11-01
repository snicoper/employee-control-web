import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwProgressModule } from '@aw/components/progress/aw-progress.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { TimesControlRoutingModule } from './times-control-routing.module';
import { TimesControlComponent } from './times-control.component';

@NgModule({
  declarations: [TimesControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    TimesControlRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwProgressModule,
    AwButtonsModule,
    AwSpinnerModule
  ]
})
export class TimesControlModule {}
