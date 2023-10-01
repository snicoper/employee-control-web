import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent],
  providers: [SidebarService]
})
export class AwNavbarModule {}
