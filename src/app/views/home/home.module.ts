import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '../../components/cards/aw-cards.module';
import { AwViewsModule } from '../../components/views/aw-views.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, AwViewsModule, AwCardsModule]
})
export class HomeModule {}
