import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { Roles } from '../core/types/roles';
import { JwtService } from '../services/jwt.service';

@Directive({
  selector: '[awRequiredRole]',
  standalone: true
})
export class RequiredRoleDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly jwtService = inject(JwtService);

  @Input() awRequiredRole? = Roles.Anonymous;

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkRole();
  }

  checkRole(): void {
    // Si awRequiredRole es nulo, mostrar siempre.
    if (!this.awRequiredRole) {
      this.elementRef.nativeElement.style.display = 'initial';

      return;
    }

    const isInRole = this.jwtService.isInRole(this.awRequiredRole as Roles);
    this.elementRef.nativeElement.style.display = isInRole ? 'initial' : 'none';
  }
}
