import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppEnvironments, SiteUrls } from '../../core/utils/_index';
import { AuthService, JwtTokenService } from '../../services/_index';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'aw-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  isAuth = false;
  userName = '';
  sidebarState: boolean;
  siteName = AppEnvironments.siteName;
  siteUrls = SiteUrls;

  private destroy$ = new Subject<void>();

  constructor(
    private sidebarService: SidebarService,
    private jwtTokenService: JwtTokenService,
    private authService: AuthService
  ) {
    this.sidebarState = this.sidebarService.sidebarStateValue;
    this.eventListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebarState(): void {
    this.sidebarService.toggle();
  }

  logOut(): void {
    this.jwtTokenService.clean();
  }

  private eventListener(): void {
    this.sidebarService.sidebarState.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => (this.sidebarState = result)
    });

    this.authService.auth.pipe(takeUntil(this.destroy$)).subscribe({
      next: (result: boolean) => {
        this.isAuth = result;
        this.userName = this.jwtTokenService.getName();
      }
    });
  }
}
