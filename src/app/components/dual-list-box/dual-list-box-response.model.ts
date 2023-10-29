import { DualListBoxItem } from './dual-list-box-item.model';

export interface DualListBoxResponse {
  itemsToAdd: DualListBoxItem[];
  itemsToRemove: DualListBoxItem[];
}
