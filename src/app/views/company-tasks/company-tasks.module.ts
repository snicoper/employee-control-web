import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwBreadcrumbModule } from '@aw/components/breadcrumb/aw-breadcrumb.module';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { PipesModule } from '@aw/pipes/pipes.module';
import { CompanyTaskCreateComponent } from './company-task-create/company-task-create.component';
import { CompanyTaskEditComponent } from './company-task-edit/company-task-edit.component';
import { CompanyTaskListComponent } from './company-task-list/company-task-list.component';
import { CompanyTaskDetailsComponent } from './company-task-view/company-task-details/company-task-details.component';
import { CompanyTaskSelectedService } from './company-task-view/company-task-selected.service';
import { CompanyTaskViewComponent } from './company-task-view/company-task-view.component';
import { CompanyTaskRoutingModule } from './company-tasks-routing.module';

@NgModule({
  declarations: [
    CompanyTaskListComponent,
    CompanyTaskViewComponent,
    CompanyTaskCreateComponent,
    CompanyTaskDetailsComponent,
    CompanyTaskEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CompanyTaskRoutingModule,
    AwFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwTablesModule,
    AwPaginationModule,
    AwButtonsModule,
    AwBreadcrumbModule,
    PipesModule
  ],
  providers: [CompanyTaskSelectedService]
})
export class CompanyTasksModule {}
