import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { AppEnvironments } from '../core/config/app-environments';

@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategyService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const title = this.buildTitle(routerState);

    if (title !== undefined) {
      this.title.setTitle(`${AppEnvironments.siteName} | ${title}`);
    }
  }
}
