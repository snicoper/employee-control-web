import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryAbsenceCreateComponent } from './category-absence-create/category-absence-create.component';
import { CategoryAbsenceEditComponent } from './category-absence-edit/category-absence-edit.component';
import { CategoryAbsenceListComponent } from './category-absence-list/category-absence-list.component';
import { CategoryAbsenceRoutingModule } from './category-absence-routing.module';

@NgModule({
  declarations: [CategoryAbsenceListComponent, CategoryAbsenceCreateComponent, CategoryAbsenceEditComponent],
  imports: [CommonModule, CategoryAbsenceRoutingModule]
})
export class CategoryAbsenceModule {}
