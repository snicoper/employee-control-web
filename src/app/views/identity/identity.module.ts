import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { IdentityRoutingModule } from './identity-routing.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    IdentityRoutingModule,
    ReactiveFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwFormsModule,
    AwButtonsModule
  ]
})
export class IdentityModule {}
