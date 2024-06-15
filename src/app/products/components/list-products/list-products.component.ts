import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";

import {CreateProductComponent} from "../create-product/create-product.component";
import {ItensProductData, ProductCreateData, ProductsPage} from "../../product";
import { ProductsService } from '../../products.service';
import { Subject, takeUntil } from 'rxjs';
import { TruncatePipe } from '../../../@shared/pipes/truncate.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    MatFormField,
    MatTableModule,
    MatIcon,
    MatMenuModule,
    TruncatePipe,
    CurrencyPipe
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent implements OnInit, OnChanges{
  @Input({required: true}) productsList: ItensProductData[] = [];
  @Output() editProductEvent: EventEmitter<{form: FormData, id: string}> = new EventEmitter<{form: FormData, id: string}>();
  products: ProductCreateData[];

  displayedColumns: string[] = ['cod', 'image', 'name', 'price', 'actions']
  dataSource: MatTableDataSource<ItensProductData>;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.productsList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productsList']){
      this.dataSource = new MatTableDataSource(changes['productsList'].currentValue);
    }
  }

  openDialogEditProduct(product: ItensProductData) {
    console.log('Product: ', product);
    
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '700px',
      data: product
    })

    dialogRef.afterClosed().subscribe({
      next: (result: {form: FormData, id: string}) => {
        if(result){
          this.editProductEvent.emit(result);
        }
      }
    });
  };
}
