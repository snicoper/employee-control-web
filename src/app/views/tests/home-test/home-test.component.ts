import { Component, OnInit, inject } from '@angular/core';
import { ApiResult } from '@aw/core/api-result/api-result';
import { ApiUrls } from '@aw/core/utils/api-urls';
import { AdminIdentityPaginated } from '@aw/models/api/_index';
import { AdminIdentityApiService } from '@aw/services/api/_index';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html'
})
export class HomeTestComponent implements OnInit {
  private readonly adminIdentityApiService = inject(AdminIdentityApiService);

  employees: ApiResult<AdminIdentityPaginated> = new ApiResult<AdminIdentityPaginated>();

  ngOnInit(): void {
    this.eventListener();
  }

  private eventListener(): void {
    this.adminIdentityApiService.get<ApiResult<AdminIdentityPaginated>>(ApiUrls.getAdminIdentitiesPaginated).subscribe({
      next: (result: ApiResult<AdminIdentityPaginated>) => {
        this.employees = result;
      }
    });
  }
}
