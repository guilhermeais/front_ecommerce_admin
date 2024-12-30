import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsPage } from './product';
import { api } from '../api';
import { LocalStorageService, StorageKeys } from '../@shared/services/local-storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers: HttpHeaders;
  productsList$: BehaviorSubject<ProductsPage> = new BehaviorSubject<ProductsPage>({total: 0, pages: 0, currentPage: 0, items: []});

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.localStorage.get(StorageKeys.user_logged_token)
    })
  }

  getProductsHttp(query: string): Observable<ProductsPage> {
    return this.http.get<ProductsPage>(`${api}/admin/products${query}`, {
      headers: this.headers
    })
  }

  getProductsList$(): ProductsPage {
    return this.productsList$.value;
  }

  createProductHttp(product: FormData): Observable<any> {
    console.log(product.get('subCategoryId'));
    
    return this.http.post<any>(`${api}/admin/products`, product, {
      headers: this.headers.delete('Content-Type')
    })
  }

  addProductToList$(product: any) {
    const productsList = this.getProductsList$();
    productsList.items.push(product);
    this.productsList$.next(productsList);
  }


  deleteProductHttp(id: string): Observable<any> {
    return this.http.delete<any>(`${api}/admin/products/${id}`, {
      headers: this.headers
    })
  }

  deleteProductFromList$(id: string) {
    const productsList = this.getProductsList$();
    productsList.items = productsList.items.filter(item => item.id !== id);
    this.productsList$.next(productsList);
  }

  updateProductHttp(product: FormData, id: string): Observable<any> {
    return this.http.patch<any>(`${api}/admin/products/${id}`, product, {
      headers: this.headers.delete('Content-Type')
    })
  }

  updateProductFromList$(product: any) {
    const productsList = this.getProductsList$();
    const index = productsList.items.findIndex(item => item.id === product.id);
    productsList.items[index] = product;
    this.productsList$.next(productsList);
  }
}
