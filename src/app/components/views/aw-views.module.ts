import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwFooterModule } from '../footer/aw-footer.module';
import { AwNavbarModule } from '../navbar/aw-navbar.module';
import { AwSidebarModule } from '../sidebar/aw-sidebar.module';
import { ViewBaseComponent } from './view-base/view-base.component';
import { ViewTitleComponent } from './view-title/view-title.component';

@NgModule({
  declarations: [ViewBaseComponent, ViewTitleComponent],
  exports: [ViewBaseComponent],
  imports: [CommonModule, AwNavbarModule, AwSidebarModule, AwFooterModule]
})
export class AwViewsModule {}
