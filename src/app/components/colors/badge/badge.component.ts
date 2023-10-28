import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-badge',
  templateUrl: './badge.component.html'
})
export class BadgeComponent {
  @Input({ required: true }) background = '';
  @Input({ required: true }) color = '';
  @Input({ required: true }) name = '';
  @Input() pill = false;
  @Input() extraCss = '';
}
