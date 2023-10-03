import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@components/buttons/aw-buttons.module';
import { AwCardsModule } from '@components/cards/aw-cards.module';
import { AwFormsModule } from '@components/forms/aw-forms.module';
import { AwViewsModule } from '@components/views/aw-views.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwFormsModule,
    AwButtonsModule
  ]
})
export class AuthModule {}
