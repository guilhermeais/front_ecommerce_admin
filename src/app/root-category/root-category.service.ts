import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, Subject} from "rxjs";
import {
  Category,
  CategoryResponseData,
  CreateSubCaategoryObject,
  SubCategory, SubCategoryResponseData
} from "./root-category.intertface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {api} from "../api";
import {SnackBarNotificationService} from "../@shared/services/snack-bar-notification.service";
import {Search} from "../@shared/util/search";
import {LocalStorageService, StorageKeys} from "../@shared/services/local-storage";

@Injectable({
  providedIn: 'root'
})
export class RootCategoryService {
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  subCategories$: BehaviorSubject<SubCategory[]> = new BehaviorSubject<SubCategory[]>([]);
  headers: HttpHeaders

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarNotificationService,
    private localStorageService: LocalStorageService,

  ) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get(StorageKeys.user_logged_token)}`
    })
  }

  getCategoriesHttp(pageOptions?: CategoryPageOptions): Observable<Category[]> {
    // const queryPageOptions = pageOptions
    //   ? Search.toQuerySearchOptions(pageOptions)
    //   : Search.InitialSearchOptions()
    
    return this.http.get<CategoryResponseData>(`${api}/admin/categories`, {
      headers: this.headers
    })
      .pipe(
        map((category) => category.items)
      )
  }

  getSubCategoriesHttp(idCategory: string): Observable<SubCategory[]> {
    return this.http.get<SubCategoryResponseData>(
      `${api}/admin/categories/${idCategory}/sub-category`,
      { headers: this.headers }
    ).pipe(map((subCategory) => subCategory.items))
  }

  updateCategoryHttp(category: Category): Observable<any>{
    return this.http.patch<any>(`${api}/admin/categories/${category.id}`,
      {name: category.name},
      {headers: this.headers}
    )
  }

  updateSubCategoryHttp(subCategory: SubCategory): Observable<any>{
    return this.http.patch<any>(`${api}/categories/${subCategory.rootCategory.id}/sub-category/${subCategory.id}`,
      {name: subCategory.name},
      { headers: this.headers }
    ).pipe(
      catchError(err => {
        this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
        return of([])
      })
    )
  }

  deleteSubCategoryHttp(subcategoryId: string, categoryId: string): Observable<any>{
    return this.http.delete(
      `${api}/admin/categories/${categoryId}/sub-category/${subcategoryId}`,
      { headers: this.headers })
      .pipe(
        catchError(err => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
          return of([])
        })
      )
  }

  deleteCategoryHttp(idCategory: string): Observable<any>{
    return this.http.delete(
      `${api}/admin/categories/${idCategory}`,
      { headers: this.headers }
    ).pipe(
      catchError(err => {
        this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + err.error.message)
        return of([])
      })
    )
  }

  createCategoryHttp(category: {name: string, description: string}): Observable<Category>{
    return this.http.post<Category>(`${api}/admin/categories`, category, { headers: this.headers })
  }

  createSubCategoryHttp(subCategory: CreateSubCaategoryObject): Observable<SubCategory>{
    return this.http.post<SubCategory>(
      `${api}/admin/categories/${subCategory.categoryId}/sub-category`,
      {name: subCategory.name, description: subCategory.description},
      { headers: this.headers }
    )
  }

  updateCategoryList$(list: Category[]){
    this.localStorageService.set(StorageKeys.categoryList, list);
    this.categories$.next(list);
  }

  updateSubCategoryList$(list: SubCategory[]){
    this.subCategories$.next(list);
  }

  addCategoryToList$(category: Category){
    const currentList = this.categories$.value;
    this.updateCategoryList$([category, ...currentList]);
    this.localStorageService.set(StorageKeys.categoryList, [category, ...currentList]);
  }

  addSubCategoryToList$(subCategory: SubCategory){
    const currentList = this.subCategories$.value;
    this.updateSubCategoryList$([subCategory, ...currentList]);
  }

  removeCategoryFromList$(id: string){
    const currentList = this.categories$.value;
    const listFiltered = currentList.filter((category) => category.id !== id);
    this.updateCategoryList$(listFiltered);
    this.localStorageService.set(StorageKeys.categoryList, listFiltered);
  }

  removeSubCategoryFromList$(id: string){
    const currentList = this.subCategories$.value;
    this.updateSubCategoryList$(currentList.filter((subCategory) => subCategory.id !== id));
  }

  updateCategoryInList$(category: Category){
    const currentList = this.categories$.value;
    const listFiltered = currentList.map((cat) => {
      if(cat.id === category.id){
        return category;
      }
      return cat;
    });
    this.updateCategoryList$(listFiltered);
    this.localStorageService.set(StorageKeys.categoryList, listFiltered);
  }

  updateSubCategoryInList$(subCategory: SubCategory){
    const currentList = this.subCategories$.value;
    const listFiltered = currentList.map((subCat) => {
      if(subCat.id === subCategory.id){
        return subCategory;
      }
      return subCat;
    });
    this.updateSubCategoryList$(listFiltered);
  }

}

export interface CategoryPageOptions {
  page: number;
  limit: number;
  name: string;
}
