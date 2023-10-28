import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge/badge.component';
import { DotComponent } from './dot/dot.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DotComponent, BadgeComponent],
  exports: [DotComponent, BadgeComponent]
})
export class AwColorsModule {}
