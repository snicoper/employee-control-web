import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'aw-company-task-add-users',
  templateUrl: './company-task-add-users.component.html'
})
export class CompanyTaskAddUsersComponent {
  @Output() changeComponent = new EventEmitter();

  handleChangeComponent(): void {
    this.changeComponent.emit();
  }
}
