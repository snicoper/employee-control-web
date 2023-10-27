import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { PipesModule } from '@aw/pipes/pipes.module';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';
import { CompanyTaskRoutingModule } from './company-tasks-routing.module';

@NgModule({
  declarations: [CompanyTaskListComponent],
  imports: [
    CommonModule,
    CompanyTaskRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    PipesModule
  ]
})
export class CompanyTasksModule {}
