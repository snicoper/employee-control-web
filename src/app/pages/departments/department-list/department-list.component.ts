import { Component, ViewChild, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { BadgeComponent } from '../../../components/badge/badge.component';
import { BreadcrumbCollection } from '../../../components/breadcrumb/breadcrumb-collection';
import { DotComponent } from '../../../components/colors/dot/dot.component';
import { PageBaseComponent } from '../../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../../components/pages/page-header/page-header.component';
import { TableFilterComponent } from '../../../components/tables/table-filter/table-filter.component';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { ApiUrl } from '../../../core/urls/api-urls';
import { SiteUrl } from '../../../core/urls/site-urls';
import { CommonUtils } from '../../../core/utils/common-utils';
import { Department } from '../../../models/entities/department.model';
import { ResultValue } from '../../../models/result-response.model';
import { BoolToIconPipe } from '../../../pipes/bool-to-icon.pipe';
import { HttpClientApiService } from '../../../services/api/http-client-api.service';

@Component({
  selector: 'aw-department-list',
  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIcon,
    MatButton,
    MatPaginatorModule,
    MatProgressSpinner,
    PageBaseComponent,
    PageHeaderComponent,
    TableFilterComponent,
    BadgeComponent,
    DotComponent,
    BoolToIconPipe
  ]
})
export class DepartmentListComponent {
  private readonly httpClientApiService = inject(HttpClientApiService);
  private readonly router = inject(Router);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  readonly breadcrumb = new BreadcrumbCollection();

  readonly displayedColumns = ['name', 'active', 'background', 'color'];
  readonly fieldsFilter = ['name'];
  readonly siteUrl = SiteUrl;

  dataSource = new MatTableDataSource<Department, MatPaginator>();
  apiResult = new ApiResult<Department>();
  loading = true;

  constructor() {
    this.setBreadcrumb();
    this.loadDepartments();
  }

  handleSelectRow(department: Department): void {
    const url = CommonUtils.urlReplaceParams(SiteUrl.departments.details, { id: department.id });
    this.router.navigateByUrl(url);
  }

  handlePageEvent(pageEvent: PageEvent): void {
    this.apiResult = this.apiResult.handlePageEvent(pageEvent);

    this.loadDepartments();
  }

  handleFilterChange(apiResult: ApiResult<Department>): void {
    this.apiResult = apiResult;
    this.loadDepartments();
  }

  handleSortChange(sortState: Sort): void {
    this.apiResult.handleSortChange(sortState);
    this.loadDepartments();
  }

  private setBreadcrumb(): void {
    this.breadcrumb.add('Departamentos', SiteUrl.departments.list, '', false);
  }

  private loadDepartments(): void {
    this.loading = true;

    this.httpClientApiService
      .getResultPaginated<Department>(this.apiResult, ApiUrl.departments.getDepartmentsPaginated)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result: ResultValue<ApiResult<Department>>) => {
          this.apiResult = ApiResult.clone<Department>(result.value);
          this.dataSource = new MatTableDataSource(result.value.items);
          this.dataSource.sort = this.sort;
        }
      });
  }
}
