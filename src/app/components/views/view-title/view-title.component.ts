import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AppEnvironments } from '@core/utils/_index';

/** Establece el titulo de la pagina (pestaña del navegador). */
@Component({
  selector: 'aw-view-title',
  template: ''
})
export class ViewTitleComponent implements OnInit {
  @Input() pageTitle = AppEnvironments.siteName;

  constructor(
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    if (this.pageTitle) {
      this.setTitle(this.pageTitle);
    } else if ('title' in this.route.snapshot.data) {
      this.setTitle(this.route.snapshot.data['title']);
    } else {
      this.setTitle();
    }
  }

  private setTitle(pageTitle?: string): void {
    let title = AppEnvironments.siteName;
    if (pageTitle) {
      title = `${pageTitle} - ${title}`;
    }

    this.title.setTitle(title);
  }
}
