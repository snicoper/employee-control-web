import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanyTasksListComponent } from './company-tasks-list/company-tasks-list.component';
import { CompanyTaskRoutingModule } from './company-tasks-routing.module';

@NgModule({
  declarations: [CompanyTasksListComponent],
  imports: [CommonModule, CompanyTaskRoutingModule, AwViewsModule]
})
export class CompanyTasksModule {}
