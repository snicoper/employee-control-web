import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTooltipsModule } from '@aw/components/tooltips/aw-tooltips.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsEditComponent } from './company-settings-edit/company-settings-edit.component';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';

@NgModule({
  declarations: [CompanySettingsDetailsComponent, CompanySettingsEditComponent],
  imports: [CommonModule, CompanySettingsRoutingModule, AwViewsModule, AwCardsModule, AwSpinnerModule, AwTooltipsModule]
})
export class CompanySettingsModule {}
