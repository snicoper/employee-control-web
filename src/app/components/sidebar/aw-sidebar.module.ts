import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@aw/directives/directives.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, NgScrollbarModule, DirectivesModule],
  exports: [SidebarComponent]
})
export class AwSidebarModule {}
