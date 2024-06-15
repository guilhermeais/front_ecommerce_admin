import { Component } from '@angular/core';
import { ListSalesComponent } from '../components/list-sales/list-sales.component';
import { SearchSalesFilterComponent } from '../components/search-sales-filter/search-sales-filter.component';
import { Sales, SalesPage, SearchSalesEvent } from '../sales.interface';
import { Paginator } from '../../@shared/util/pagination/paginator';
import { SalesService } from '../services/sales.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarNotificationService } from '../../@shared/services/snack-bar-notification.service';
import { ErrorApiResponse } from '../../@shared/util/pagination/error.interface';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreComponent } from '../components/view-more/view-more.component';
import { PageChange, PaginatorComponent } from '../../@shared/components/paginator/paginator.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    ListSalesComponent,
    SearchSalesFilterComponent,
    PaginatorComponent
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {

  salesPagination: Paginator = new Paginator({limit: 10, page: 1});
  salesPage: SalesPage = {total:0, items: [], currentPage:0, page: 0};
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private salesService: SalesService,
    private snackBar: SnackBarNotificationService,
    private dialog: MatDialog
  ){
    this.getSalesService();
  }

  receiveSearchSalesEvent($event: SearchSalesEvent) {
    console.log($event)
  }

  receivePageChange($event: PageChange){
    this.salesPagination.page = $event.page;
    this.salesPagination.limit = $event.limit;
    this.getSalesService();
  }

  getSalesService(){
    const params = this.salesPagination.toQueryString();
    this.salesService.getSalesApi(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (salesPage: SalesPage) => {
          this.salesPage = salesPage;
        },
        error: (err: ErrorApiResponse) => {
          console.error(err);
          this.snackBar.openErrorSnackBar(err.error.message);
        }
      })
  }

  openDialogViewMore(sale: Sales){
    const dialogRef = this.dialog.open(ViewMoreComponent, {
      data: sale,
      width: '700px'
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        return;
      });
  }
}
