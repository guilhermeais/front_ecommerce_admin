import { Component, OnDestroy } from '@angular/core';
import {ListProductsComponent} from "../components/list-products/list-products.component";

import { ProductsService } from '../products.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarNotificationService } from '../../@shared/services/snack-bar-notification.service';
import { SpinnerComponent } from '../../@shared/components/spinner/spinner.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    ListProductsComponent,
    SpinnerComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  loadingProductCreateOrUpdate: boolean = false;

  constructor(
    private productsService: ProductsService,
    private snackBar: SnackBarNotificationService
  ){
    this.getProductsService();
  }

  receivesProductCreate(product: FormData){
    this.loadingProductCreateOrUpdate = true;
    this.createProductService(product);
  }

  receivesProductEdit(product: {form: FormData, id: string}){
    this.loadingProductCreateOrUpdate = true;
    this.updateProductService(product);
  }

  receivesProductDelete(id: string){
    this.deleteProductService(id);
  }

  getProductsService(){
    this.productsService.getProductsHttp()
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {          
          this.productsService.productsList$.next(value);
        }
      })
  }

  createProductService(product: FormData){
    this.productsService.createProductHttp(product)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          console.log('Created Product: ', value);
          
          this.loadingProductCreateOrUpdate = false;
          this.snackBar.openSuccessSnackBar('Produto criado com sucesso');
          this.getProductsService();
        },
        error: (error) => {
          this.loadingProductCreateOrUpdate = false;
          this.snackBar.openErrorSnackBar('Erro ao criar produto: ' + error.error.message);
          console.log(error);
        }
      })
  }

  updateProductService(product: {form: FormData, id: string}){
    this.productsService.updateProductHttp(product.form, product.id)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.loadingProductCreateOrUpdate = false;
          this.snackBar.openSuccessSnackBar('Produto atualizado com sucesso');
          this.getProductsService();
        },
        error: (error) => {
          this.loadingProductCreateOrUpdate = false;
          this.snackBar.openErrorSnackBar('Erro ao atualizar produto: ' + error.error.message);
          console.log(error);
        }
      })
  }

  deleteProductService(id: string){
    this.productsService.deleteProductHttp(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.snackBar.openSuccessSnackBar('Produto deletado com sucesso');
          this.productsService.deleteProductFromList$(id);
        },
        error: (error) => {
          this.snackBar.openErrorSnackBar('Erro ao deletar produto: ' + error.error.message);
          console.log(error);
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
