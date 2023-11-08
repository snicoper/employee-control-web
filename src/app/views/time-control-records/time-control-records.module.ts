import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { TimeControlRecordListComponent } from '@aw/views/time-control-records/time-control-record-list/time-control-record-list.component';
import { TimeControlRecordsRoutingModule } from './time-control-records-routing.module';

@NgModule({
  declarations: [TimeControlRecordListComponent],
  imports: [
    CommonModule,
    TimeControlRecordsRoutingModule,
    AwDirectivesModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    AwPipesModule,
    AwColorsModule
  ]
})
export class TimeControlRecordsModule {}
