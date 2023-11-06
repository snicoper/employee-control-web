import { Location } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

@Component({
  selector: 'aw-btn-back',
  templateUrl: './btn-back.component.html'
})
export class BtnBackComponent {
  @Input() cssClass = 'btn btn-primary';
  @Input() icon = 'fa-solid fa-chevron-left';

  private readonly location = inject(Location);

  handleClick(): void {
    this.location.back();
  }
}
