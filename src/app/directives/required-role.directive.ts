import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { Roles } from '@aw/core/types/roles';
import { JwtService } from '@aw/services/jwt.service';

@Directive({ selector: '[awRequiredRole]' })
export class RequiredRoleDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly jwtService = inject(JwtService);

  @Input({ required: true }) awRequiredRole = Roles.anonymous;

  ngOnInit(): void {
    this.elementRef.nativeElement.style.display = 'none';
    this.checkAccess();
  }

  checkAccess(): void {
    const isInRole = this.jwtService.isInRole(this.awRequiredRole as string);
    this.elementRef.nativeElement.style.display = isInRole ? 'block' : 'none';
  }
}
