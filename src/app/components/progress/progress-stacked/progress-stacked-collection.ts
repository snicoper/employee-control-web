import { ProgressStackedItem } from './progress-stacked-item.model';

export class ProgressStackedCollection {
  progressStackedItems: ProgressStackedItem[] = [];
  title: string = '';

  addItem(progressStackedItem: ProgressStackedItem): this {
    this.progressStackedItems.push({
      id: progressStackedItem.id,
      valueNow: progressStackedItem.valueNow,
      valueMin: progressStackedItem.valueMin,
      valueMax: progressStackedItem.valueMax,
      percent: progressStackedItem.percent,
      content: progressStackedItem.content,
      tooltip: progressStackedItem.tooltip,
      background: progressStackedItem.background
    });

    return this;
  }

  addTitle(title: string): void {
    this.title = title;
  }
}
