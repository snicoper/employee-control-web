import { Component, Input, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LayoutService } from '../../../services/_index';

@Component({
  selector: 'aw-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnDestroy {
  @Input() cssContent = 'container-fluid';
  @Input() showPageTitle = true;
  @Input() pageTitle = '';

  // States.
  @Input() showNavbar = true;
  @Input() showSidebar = true;
  @Input() showFooter = true;

  private destroy$ = new Subject<void>();

  constructor(private layoutService: LayoutService) {
    this.eventListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private eventListener(): void {
    this.layoutService.showNavbar.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.showNavbar = result)
    });

    this.layoutService.showSidebar.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.showSidebar = result)
    });

    this.layoutService.showFooter.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.showFooter = result)
    });
  }
}
