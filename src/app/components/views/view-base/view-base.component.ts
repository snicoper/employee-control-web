import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { LayoutService } from '../../../services/_index';

@Component({
  selector: 'aw-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  /** Injects. */
  private layoutService = inject(LayoutService);

  /** Inputs. */
  @Input() cssContent = 'container-fluid';
  @Input() showPageTitle = true;
  @Input() pageTitle = '';

  @Input() showNavbar = true;
  @Input() showSidebar = true;
  @Input() showFooter = true;

  /** Computed. */
  showNavbar$ = computed(() => this.layoutService.showNavbar$());
  showSidebar$ = computed(() => this.layoutService.showSidebar$());
  showFooter$ = computed(() => this.layoutService.showFooter$());

  ngOnInit(): void {
    this.layoutService.showNavbar$.set(this.showNavbar);
    this.layoutService.showSidebar$.set(this.showSidebar);
    this.layoutService.showFooter$.set(this.showFooter);
  }
}
