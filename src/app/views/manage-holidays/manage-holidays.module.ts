import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { ManageHolidaysRoutingModule } from './manage-holidays-routing.module';
import { ManageHolidaysComponent } from './manage-holidays.component';

@NgModule({
  declarations: [ManageHolidaysComponent],
  imports: [CommonModule, ManageHolidaysRoutingModule, AwViewsModule]
})
export class ManageHolidaysModule {}
