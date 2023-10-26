import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { DirectivesModule } from '@aw/directives/directives.module';
import { PipesModule } from '@aw/pipes/pipes.module';
import { AwBreadcrumbModule } from './../../components/breadcrumb/aw-breadcrumb.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-view/employee-details/employee-details.component';
import { EmployeeSelectedService } from './employee-view/employee-selected.service';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeInviteComponent,
    EmployeeViewComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwFormsModule,
    AwButtonsModule,
    AwTablesModule,
    AwPaginationModule,
    AwSpinnerModule,
    AwBreadcrumbModule,
    PipesModule,
    DirectivesModule
  ],
  providers: [EmployeeSelectedService]
})
export class EmployeesModule {}
