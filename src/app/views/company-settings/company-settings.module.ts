import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsEditComponent } from './company-settings-edit/company-settings-edit.component';

@NgModule({
  declarations: [CompanySettingsDetailsComponent, CompanySettingsEditComponent],
  imports: [CommonModule, CompanySettingsRoutingModule, AwViewsModule, AwCardsModule]
})
export class CompanySettingsModule {}
