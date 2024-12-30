import { Component, OnDestroy } from '@angular/core';
import {ListProductsComponent} from "../components/list-products/list-products.component";

import { ProductsService } from '../products.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarNotificationService } from '../../@shared/services/snack-bar-notification.service';
import { SpinnerComponent } from '../../@shared/components/spinner/spinner.component';
import { PageChange, PaginatorComponent } from '../../@shared/components/paginator/paginator.component';
import { ItensProductData, ProductsPage } from '../product';
import { Paginator } from '../../@shared/util/pagination/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../components/create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootCategoryService } from '../../root-category/root-category.service';
import { Category } from '../../root-category/root-category.intertface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    ListProductsComponent,
    SpinnerComponent,
    PaginatorComponent,
    FormsModule,
    MatTableModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnDestroy {

  destroy$: Subject<void> = new Subject<void>();
  loadingProductCreateOrUpdate: boolean = false;
  products: ProductsPage = {total: 0, pages: 0, currentPage: 0, items: []};
  paginationsOptions: Paginator = new Paginator({page: 1, limit: 10});
  categories: Category[] = [];
  searchProductParams: SearchProductParams = {categoryId: null, name: null};

  constructor(
    private productsService: ProductsService,
    private snackBar: SnackBarNotificationService,
    private dialog: MatDialog,
    private rootCategoryService: RootCategoryService
  ){
    this.getProductsService();
    this.getCategoriesService();
  }

  applyFilter() {
    this.paginationsOptions.resetPage();
    const query = this.mountQuerySearch();
    this.getProductsService(query)
  }

  mountQuerySearch(){
    if(this.searchProductParams.name === '' || this.searchProductParams.name === null){
      delete this.searchProductParams.name;
    }

    if(this.searchProductParams.categoryId === '' || this.searchProductParams.categoryId === null || this.searchProductParams.categoryId === 'all'){
      delete this.searchProductParams.categoryId;
    }

    return this.paginationsOptions.toQueryString(this.searchProductParams);

  }

  SelectCategoryBySearch(event: Event) {

    if((event.target as HTMLSelectElement).value === 'all'){
      this.searchProductParams.categoryId = null;
      return;
    }

    this.searchProductParams.categoryId = (event.target as HTMLSelectElement).value;
  }

  openDialogCreateProduct() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '700px'
    })

    dialogRef.afterClosed().subscribe((result: FormData)=> {
      if(result){        
        this.loadingProductCreateOrUpdate = true;
        this.createProductService(result);
      }
    });
  }

  receivesProductEdit(product: {formData: FormData, id: string}){
    console.log('Product: ', product);
    
    this.loadingProductCreateOrUpdate = true;
    this.updateProductService(product);
  }

  receivesPageEvent(event: PageChange) {
    this.paginationsOptions.page = event.page;
    this.paginationsOptions.limit = event.limit;
    const query = this.mountQuerySearch();
    this.getProductsService(query);
  }

  // ------------------- Services -------------------

  getProductsService(query?: string){

    if(!query){
      query = this.paginationsOptions.toQueryString();
    }

    this.productsService.getProductsHttp(query)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {          
          this.products = value;
        },
        error: (error) => {
          this.snackBar.openErrorSnackBar('Erro ao buscar produtos: ' + error.error.message);
          console.log(error);
        }
      })
  }

  getCategoriesService() {
    this.rootCategoryService.getCategoriesHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.categories = value;
        },
        error: (error) => {
          console.error(error)
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

  updateProductService(product: {formData: FormData, id: string}){
    this.productsService.updateProductHttp(product.formData, product.id)
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

interface SearchProductParams {
  categoryId: string,
  name: string
}
