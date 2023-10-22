import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { InviteEmployeeComponent } from './invite-employee/invite-employee.component';

@NgModule({
  declarations: [EmployeeListComponent, InviteEmployeeComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwFormsModule,
    AwButtonsModule
  ]
})
export class EmployeesModule {}
