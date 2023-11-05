import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentEditComponent } from './department-edit/department-edit.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentRoutingModule } from './departments-routing.module';

@NgModule({
  declarations: [DepartmentCreateComponent, DepartmentListComponent, DepartmentEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    AwViewsModule,
    AwFormsModule,
    AwSpinnerModule,
    AwCardsModule,
    AwColorsModule,
    AwButtonsModule
  ]
})
export class DepartmentsModule {}
