import { HtmlItemSelector } from '@aw/core/models/_index';

export interface DualListBoxResponse {
  itemsToAdd: HtmlItemSelector[];
  itemsToRemove: HtmlItemSelector[];
}
