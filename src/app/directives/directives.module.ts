import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { RequiredRoleDirective } from './required-role.directive';

@NgModule({
  declarations: [ClickStopPropagationDirective, RequiredRoleDirective],
  imports: [CommonModule],
  exports: [ClickStopPropagationDirective, RequiredRoleDirective]
})
export class DirectivesModule {}
