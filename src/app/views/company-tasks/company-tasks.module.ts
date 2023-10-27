import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { PipesModule } from '@aw/pipes/pipes.module';
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskDetailsComponent } from './company-task-details/company-task-details.component';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';
import { CompanyTaskRoutingModule } from './company-tasks-routing.module';

@NgModule({
  declarations: [CompanyTaskListComponent, CompanyTaskDetailsComponent, CompanyTaskCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyTaskRoutingModule,
    AwFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    AwButtonsModule,
    PipesModule
  ]
})
export class CompanyTasksModule {}
