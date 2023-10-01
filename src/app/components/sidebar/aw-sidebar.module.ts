import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { SidebarService } from './sidebar.service';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent],
  providers: [SidebarService]
})
export class AwSidebarModule {}
