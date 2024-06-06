import { Component, EventEmitter, Output } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";

import {CreateProductComponent} from "../create-product/create-product.component";
import {ItensProductData, ProductCreateData, ProductsPage} from "../../product";
import { ProductsService } from '../../products.service';
import { Subject, takeUntil } from 'rxjs';
import { TruncatePipe } from '../../../@shared/pipes/truncate.pipe';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { EditProductComponent } from '../edit-product/edit-product.component';


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    MatFormField,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatInput,
    MatHeaderRow,
    MatRow,
    MatLabel,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRowDef,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    TruncatePipe,
    MatSlideToggleModule
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss'
})
export class ListProductsComponent {
  @Output() createProductEvent: EventEmitter<FormData> = new EventEmitter<FormData>();
  @Output() deleteProductEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() editProductEvent: EventEmitter<{form: FormData, id: string}> = new EventEmitter<{form: FormData, id: string}>();
  products: ProductCreateData[];

  displayedColumns: string[] = ['cod', 'image', 'name', 'price', 'actions']
  dataSource: MatTableDataSource<ItensProductData>;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService
  ) {
    this.observeProductList();
  }

  observeProductList() {
    this.productsService.productsList$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value: ProductsPage) => {
          this.dataSource = new MatTableDataSource(value.items);
          console.log('Products list: ', value.items);
          
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogCreateProduct() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '700px'
    })

    dialogRef.afterClosed().subscribe((result: FormData)=> {
      if(result){        
        this.createProductEvent.emit(result);
      }
    });
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
