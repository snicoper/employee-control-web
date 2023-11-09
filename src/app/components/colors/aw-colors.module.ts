import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge/badge.component';
import { DotDangerComponent } from './dot-danger/dot-danger.component';
import { DotSuccessComponent } from './dot-success/dot-success.component';
import { DotComponent } from './dot/dot.component';
import { DotWarningComponent } from './dot-warning/dot-warning.component';
import { DotInfoComponent } from './dot-info/dot-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DotComponent,
    BadgeComponent,
    DotSuccessComponent,
    DotDangerComponent,
    DotWarningComponent,
    DotInfoComponent
  ],
  exports: [DotComponent, BadgeComponent, DotSuccessComponent, DotDangerComponent]
})
export class AwColorsModule {}
