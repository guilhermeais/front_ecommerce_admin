import {Component, OnDestroy} from '@angular/core';
import {ListRootCategoryComponent} from "../components/list-root-category/list-root-category.component";
import {HttpClientModule} from "@angular/common/http";
import {RootCategoryService} from "../root-category.service";
import {ListSubCategoryComponent} from "../components/list-sub-category/list-sub-category.component";
import {FormsModule} from "@angular/forms";
import {CreateCategoryComponent} from "../components/create-category/create-category.component";
import {MatDialog} from "@angular/material/dialog";
import {Category, SubCategory} from "../root-category.intertface";
import {Subject, takeUntil} from "rxjs";
import { SnackBarNotificationService } from '../../@shared/services/snack-bar-notification.service';

@Component({
  selector: 'app-root-category.page',
  standalone: true,
  imports: [
    ListRootCategoryComponent,
    HttpClientModule,
    ListSubCategoryComponent,
    FormsModule
  ],
  providers:[
    RootCategoryService
  ],
  templateUrl: './root-category.page.component.html',
  styleUrl: './root-category.page.component.scss'
})
export class RootCategoryPageComponent implements OnDestroy{
  categories: Category[];
  categorySelected?: Category;
  subCategories?: SubCategory[];
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private rootCategoryService: RootCategoryService,
    private dialogCtl: MatDialog,
    private snackBarService: SnackBarNotificationService
  ) {
    this.observeCategories();
    this.observeSubCategories();
    this.getCategoriesService();
  }

  observeCategories() {
    this.rootCategoryService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (value) => {
        if(value.length > 0) {
          this.categories = value
        }
      }
    })
  }
  
  observeSubCategories() {
    this.rootCategoryService.subCategories$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (value) => {
        if(value.length > 0){
          this.subCategories = value
        }
      }
    })
  }

  getCategoriesService() {
    this.rootCategoryService.getCategoriesHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value.length === 0){
            this.snackBarService.openSuccessSnackBar('Não foi encontrado nenhuma categoria cadastrada.')
          }
          this.rootCategoryService.updateCategoryList$(value)
        },
        error: (error) => {
          console.error(error)
        }
      })
  }

  receiveCategorySelected(categoryId: string) {
    this.categorySelected = this.categories.find((category) => category.id === categoryId);
    this.getSucategoriesService(categoryId);
  }

  receiveSubCategoryEdit(subCategory: SubCategory) {
    this.editSubcategoryService(subCategory)
  }

  receiveSubCategoryDelete(subCategory: SubCategory) {
    // console.log(subCategory);
    this.removeSubCategoryService(subCategory)
  }

  receiveSubCategoryCreate(subCategory: any) {
    this.createSubCategoryService(subCategory)
  }

  getSucategoriesService(categoryId: string) {
    this.rootCategoryService.getSubCategoriesHttp(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.rootCategoryService.updateSubCategoryList$(value);
        },
        error: (error) => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + error.error.message)
          console.error(error)
        }
      })
  }

  openModalCreateCategory(){
    const dialogRef  = this.dialogCtl.open(CreateCategoryComponent, {
      width: '300px',
    })
    dialogRef.afterClosed().subscribe({
      next: (value) => {
        if(value){
          this.createCategoryService(value)
        }
      }
    })
  }

  createCategoryService(object: {name: string, description: string}) {
    this.rootCategoryService.createCategoryHttp(object)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.snackBarService.openSuccessSnackBar('Categoria criada com sucesso.')
          console.log(value);
          
          this.rootCategoryService.addCategoryToList$(value)
        },
        error: (error) => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + error.error.message)
          console.error(error)
        }
      })
  }

  editCategoryName(category: Category) {
    this.rootCategoryService.updateCategoryHttp(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.snackBarService.openSuccessSnackBar('Categoria atualizada com sucesso.')
          this.rootCategoryService.updateCategoryInList$(category)
        },
        error: (error) => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + error.error.message)
          console.error(error)
        }
      })
  }

  deleteCategory(category: Category) {
    this.removeCategoryService(category.id)
  }

  editSubcategoryService(subCategory: SubCategory){
    this.rootCategoryService.updateSubCategoryHttp(subCategory)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.updateSubCategoryInList$(subCategory)
          }
        }
      })
  }

  removeCategoryService(id: string){
    this.rootCategoryService.deleteCategoryHttp(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.snackBarService.openSuccessSnackBar('Categoria removida com sucesso.');
          this.categorySelected = undefined;
          this.rootCategoryService.removeCategoryFromList$(id);
        },
        error: (error) => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + error.error.message)
          console.error(error)
        }
      })
  }

  removeSubCategoryService(subcategory: SubCategory){
    this.rootCategoryService.deleteSubCategoryHttp(subcategory.id, subcategory.rootCategory.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value && !Array.isArray(value)){
            this.rootCategoryService.removeSubCategoryFromList$(subcategory.id)
          }
        }
      })
  }

  createSubCategoryService(subCategory: any){
    this.rootCategoryService.createSubCategoryHttp(subCategory)
      .subscribe({
        next: (value) => {
          this.snackBarService.openSuccessSnackBar('Subcategoria criada com sucesso.')
          this.rootCategoryService.addSubCategoryToList$(value)
        },
        error: (error) => {
          this.snackBarService.openErrorSnackBar('Ops, algo deu errado: ' + error.error.message)
          console.error(error)
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
