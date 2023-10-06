import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { HomeTestComponent } from './home-test/home-test.component';
import { TestsRoutingModule } from './tests-routing.module';

@NgModule({
  declarations: [HomeTestComponent],
  imports: [CommonModule, TestsRoutingModule, AwViewsModule, AwCardsModule]
})
export class TestsModule {}
