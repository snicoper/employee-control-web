import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';

@NgModule({
  declarations: [CompanySettingsComponent],
  imports: [CommonModule, CompanySettingsRoutingModule, AwViewsModule, AwCardsModule]
})
export class CompanySettingsModule {}
