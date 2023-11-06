import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AwBreadcrumbModule } from '@aw/components/breadcrumb/aw-breadcrumb.module';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwPaginationModule } from '@aw/components/pagination/aw-pagination.module';
import { AwProgressModule } from '@aw/components/progress/aw-progress.module';
import { AwSelectorsModule } from '@aw/components/selectors/aw-selectors.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeInviteComponent } from './employee-invite/employee-invite.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-view/employee-details/employee-details.component';
import { EmployeeRolesEditComponent } from './employee-view/employee-details/employee-roles-edit/employee-roles-edit.component';
import { EmployeeSelectedService } from './employee-view/employee-selected.service';
import { EmployeeTasksComponent } from './employee-view/employee-tasks/employee-tasks.component';
import { EmployeeTimeControlComponent } from './employee-view/employee-time-control/employee-time-control.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeesRoutingModule } from './employees-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeInviteComponent,
    EmployeeViewComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    EmployeeTasksComponent,
    EmployeeTimeControlComponent,
    EmployeeRolesEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule,
    EmployeesRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwFormsModule,
    AwButtonsModule,
    AwTablesModule,
    AwPaginationModule,
    AwSpinnerModule,
    AwBreadcrumbModule,
    AwColorsModule,
    AwPipesModule,
    AwDirectivesModule,
    AwSelectorsModule,
    AwProgressModule
  ],
  providers: [BsModalService, EmployeeSelectedService]
})
export class EmployeesModule {}
