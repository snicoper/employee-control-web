import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsComponent } from './user-settings.component';

@NgModule({
  declarations: [UserSettingsComponent],
  imports: [CommonModule, UserSettingsRoutingModule, AwViewsModule, AwCardsModule]
})
export class UserSettingsModule {}
