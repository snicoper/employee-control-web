import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { TimeControlRecordListComponent } from '@aw/views/time-control-records/time-control-record-list/time-control-record-list.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TimeControlRecordEditComponent } from './time-control-record-edit/time-control-record-edit.component';
import { TimeControlRecordsRoutingModule } from './time-control-records-routing.module';

@NgModule({
  declarations: [TimeControlRecordListComponent, TimeControlRecordEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule,
    TimeControlRecordsRoutingModule,
    AwDirectivesModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    AwPipesModule,
    AwColorsModule,
    AwButtonsModule,
    AwFormsModule,
    AwSpinnerModule
  ],
  providers: [BsModalService]
})
export class TimeControlRecordsModule {}
