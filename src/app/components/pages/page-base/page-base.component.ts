import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SidenavComponent } from '../../sidenavs/sidenav/sidenav.component';

@Component({
  selector: 'aw-page-base',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, FooterComponent],
  templateUrl: './page-base.component.html'
})
export class PageBaseComponent {
  sidenavState = true;

  handleToggleSidenavState(): void {
    this.sidenavState = !this.sidenavState;
  }
}
