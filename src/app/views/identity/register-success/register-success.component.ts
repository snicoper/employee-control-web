import { Component } from '@angular/core';
import { SiteUrls } from './../../../core/urls/site-urls';

@Component({
  selector: 'aw-register-success',
  templateUrl: './register-success.component.html'
})
export class RegisterSuccessComponent {
  siteUrls = SiteUrls;
}
