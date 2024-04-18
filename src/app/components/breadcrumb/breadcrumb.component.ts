import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BreadcrumbCollection } from './breadcrumb-collection';

@Component({
  selector: 'aw-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [NgClass, RouterLink, MatIcon]
})
export class BreadcrumbComponent {
  breadcrumb = input(new BreadcrumbCollection());
}
