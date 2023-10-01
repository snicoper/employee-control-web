import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { siteUrls } from '../../core/urls/_index';
import { AuthService, JwtTokenService } from '../../services/_index';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'aw-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy {
  authState = false;
  sidebarState: boolean;
  siteUrls = siteUrls;

  private destroy$ = new Subject<void>();

  constructor(
    private sidebarService: SidebarService,
    private jwtTokenService: JwtTokenService,
    private authService: AuthService
  ) {
    this.sidebarState = sidebarService.sidebarStateValue;

    this.eventListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleClick(): void {
    this.sidebarService.toggle();
  }

  handleLogOut(): void {
    this.jwtTokenService.clean();
  }

  private eventListener(): void {
    this.sidebarService.sidebarState.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.sidebarState = result)
    });

    this.authService.isAuth.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.authState = result)
    });
  }
}
