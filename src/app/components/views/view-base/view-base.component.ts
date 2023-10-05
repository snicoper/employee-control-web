import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { LayoutService } from '@aw/services/_index';

@Component({
  selector: 'aw-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);

  @Input() cssContent = 'container-fluid';
  @Input() showPageTitle = true;
  @Input() pageTitle = '';

  @Input() showNavbar = true;
  @Input() showSidebar = true;
  @Input() showFooter = true;

  readonly showNavbar$ = computed(() => this.layoutService.showNavbar$());
  readonly showSidebar$ = computed(() => this.layoutService.showSidebar$());
  readonly showFooter$ = computed(() => this.layoutService.showFooter$());

  ngOnInit(): void {
    this.layoutService.showNavbar$.set(this.showNavbar);
    this.layoutService.showSidebar$.set(this.showSidebar);
    this.layoutService.showFooter$.set(this.showFooter);
  }
}
