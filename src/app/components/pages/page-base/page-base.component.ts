import { NgClass } from '@angular/common';
import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidebarComponent } from '../../sidebars/sidebar-menu/sidebar.component';

@Component({
  selector: 'aw-page-base',
  templateUrl: './page-base.component.html',
  styleUrls: ['./page-base.component.scss'],
  standalone: true,
  imports: [NgClass, SidebarComponent, NavbarComponent, FooterComponent]
})
export class PageBaseComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);

  @Input() cssContent = 'container-fluid';
  @Input() navbarState = true;
  @Input() sidebarMenuState = true;
  @Input() footerState = true;

  readonly navbarState$ = computed(() => this.layoutService.navbarState$());
  readonly sidebarMenuState$ = computed(() => this.layoutService.sidebarMenuState$());
  readonly footerState$ = computed(() => this.layoutService.footerState$());

  ngOnInit(): void {
    this.layoutService.navbarState$.set(this.navbarState);
    this.layoutService.sidebarMenuState$.set(this.sidebarMenuState);
    this.layoutService.footerState$.set(this.footerState);
  }
}
