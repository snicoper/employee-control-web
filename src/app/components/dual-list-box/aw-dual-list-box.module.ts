import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DualListBoxComponent } from './dual-list-box.component';

@NgModule({
  declarations: [DualListBoxComponent],
  imports: [CommonModule, FormsModule],
  exports: [DualListBoxComponent]
})
export class AwDualListBoxModule {}
