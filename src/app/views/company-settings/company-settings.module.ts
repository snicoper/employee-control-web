import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';

@NgModule({
  declarations: [CompanySettingsDetailsComponent],
  imports: [CommonModule, CompanySettingsRoutingModule, AwViewsModule, AwCardsModule]
})
export class CompanySettingsModule {}
