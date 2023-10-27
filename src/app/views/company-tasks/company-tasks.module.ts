import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanyTasksListComponent } from './company-tasks-list/company-tasks-list.component';
import { CompanyTaskRoutingModule } from './company-tasks-routing.module';

@NgModule({
  declarations: [CompanyTasksListComponent],
  imports: [CommonModule, CompanyTaskRoutingModule, AwViewsModule, AwCardsModule, AwTablesModule, AwPaginationModule]
})
export class CompanyTasksModule {}
