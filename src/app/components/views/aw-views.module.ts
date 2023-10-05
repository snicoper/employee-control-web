import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwFooterModule } from '@aw/components/footer/aw-footer.module';
import { AwNavbarModule } from '@aw/components/navbar/aw-navbar.module';
import { AwSidebarModule } from '@aw/components/sidebar/aw-sidebar.module';
import { ViewBaseComponent } from './view-base/view-base.component';
import { ViewTitleComponent } from './view-title/view-title.component';

@NgModule({
  declarations: [ViewBaseComponent, ViewTitleComponent],
  exports: [ViewBaseComponent],
  imports: [CommonModule, AwNavbarModule, AwSidebarModule, AwFooterModule]
})
export class AwViewsModule {}
