import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[awClickStopPropagation]'
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  // eslint-disable-next-line
  onClick(event: any): void {
    event.stopPropagation();
  }
}
