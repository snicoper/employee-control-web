import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DualListBoxItem } from './dual-list-box-item.model';
import { DualListBoxResponse } from './dual-list-box-response.model';

@Component({
  selector: 'aw-dual-list-box',
  templateUrl: './dual-list-box.component.html',
  styleUrls: ['./dual-list-box.component.scss']
})
export class DualListBoxComponent implements OnInit {
  @Input({ required: true }) dualListBoxItems: DualListBoxItem[] = [];
  @Input() size = 10;

  @Output() saveChanges = new EventEmitter<DualListBoxResponse>();

  /** Box left. */
  boxLeftId = Math.random().toString();
  dualListBoxItemsLeft: DualListBoxItem[] = [];
  itemsLeftSelected: number[] = [];
  termLeftValue = '';

  /** Box right. */
  boxRightId = Math.random().toString();
  dualListBoxItemsRight: DualListBoxItem[] = [];
  itemsRightSelected: number[] = [];
  termRightValue = '';

  ngOnInit(): void {
    // Separar grupos y eliminar referencias de dualListBoxItems.
    this.dualListBoxItems.forEach((item) => {
      if (!item.selected) {
        this.dualListBoxItemsLeft.push(Object.assign({} as DualListBoxItem, item));
      } else {
        this.dualListBoxItemsRight.push(Object.assign({} as DualListBoxItem, item));
      }
    });

    this.sortItems(this.dualListBoxItemsLeft);
    this.sortItems(this.dualListBoxItemsRight);
  }

  /** Filtros parte izquierdo. */
  handleFilterLeftBox(): void {
    this.dualListBoxItemsLeft = this.dualListBoxItems.filter(
      (item) => !item.selected && item.name.toLocaleLowerCase().includes(this.termLeftValue.toLocaleLowerCase())
    );
  }

  /** Filtros parte derecho. */
  handleFilterRightBox(): void {
    this.dualListBoxItemsRight = this.dualListBoxItems.filter(
      (item) => item.selected && item.name.toLocaleLowerCase().includes(this.termRightValue.toLocaleLowerCase())
    );
  }

  /** Mover items seleccionados en la izquierda a la derecha. */
  handleLeftBtnClick(): void {
    this.itemsLeftSelected.forEach((key) => {
      const index = this.dualListBoxItemsLeft.findIndex((dualBoxItem) => dualBoxItem.key === key);
      const item = this.dualListBoxItemsLeft[index];

      if (index >= 0) {
        this.dualListBoxItemsLeft.splice(index, 1);
      }

      item.selected = true;
      this.dualListBoxItemsRight.push(item);
      this.sortItems(this.dualListBoxItemsRight);
    });
  }

  /** Mover items seleccionados en la derecha a la izquierda. */
  handleRightBtnClick(): void {
    this.itemsRightSelected.forEach((key) => {
      const index = this.dualListBoxItemsRight.findIndex((dualBoxItem) => dualBoxItem.key === key);
      const item = this.dualListBoxItemsRight[index];

      if (index >= 0) {
        this.dualListBoxItemsRight.splice(index, 1);
      }

      item.selected = false;
      this.dualListBoxItemsLeft.push(item);
      this.sortItems(this.dualListBoxItemsLeft);
    });
  }

  /** Filtrar los items movidos de un lado a otro y viceversa. */
  handleSaveChanges(): void {
    const itemsToAdd: DualListBoxItem[] = [];
    const itemsToRemove: DualListBoxItem[] = [];

    this.dualListBoxItemsRight.forEach((itemRight) => {
      const item = this.dualListBoxItems.find(
        (itemList) => itemList.key === itemRight.key && itemList.selected !== itemRight.selected
      );

      if (item) {
        itemsToAdd.push(item);
      }
    });

    this.dualListBoxItemsLeft.forEach((itemLeft) => {
      const item = this.dualListBoxItems.find(
        (itemList) => itemList.key === itemLeft.key && itemList.selected !== itemLeft.selected
      );

      if (item) {
        itemsToRemove.push(item);
      }
    });

    this.saveChanges.emit({ itemsToAdd: itemsToAdd, itemsToRemove: itemsToRemove });
  }

  /** Ordenar los items por el name. */
  private sortItems(items: DualListBoxItem[]): void {
    items.sort((left: DualListBoxItem, right: DualListBoxItem) => (left.name < right.name ? -1 : 1));
  }
}
