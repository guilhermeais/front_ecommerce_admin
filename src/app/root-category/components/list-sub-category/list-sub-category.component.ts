import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RootCategoryService} from "../../root-category.service";
import {Category, SubCategory} from "../../root-category.intertface";
import { MatDialog } from '@angular/material/dialog';
import { CreateSubCategoryComponent } from '../create-sub-category/create-sub-category.component';

@Component({
  selector: 'app-list-sub-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './list-sub-category.component.html',
  styleUrl: './list-sub-category.component.scss'
})
export class ListSubCategoryComponent {
  @Input() subCategories: SubCategory[];
  @Input() categorySelected: Category;
  @Output() subCategoryEdit: EventEmitter<SubCategory> = new EventEmitter<SubCategory>()
  @Output() subCategoryDelete: EventEmitter<SubCategory> = new EventEmitter<SubCategory>()
  @Output() subCategoryCreate: EventEmitter<any> = new EventEmitter<any>()
  
  constructor(
    private modalCtl: MatDialog,
    private rootCategoryService: RootCategoryService
  ) {
    this.rootCategoryService.subCategories$.subscribe({
      next: (value) => {
        this.subCategories = value
      }
    
    })
  }

  activeEditMode(subCategory: SubCategory){
    subCategory.editMode = true;
  }
  saveSubCategoryEdit(subCategory: SubCategory){
    this.subCategoryEdit.emit(subCategory);
    subCategory.editMode = false;
  }
  deleteSubCategory(subCategory: SubCategory){
    this.subCategoryDelete.emit(subCategory);
  }

  openModalCreateSubCategory(){
    this.modalCtl.open(CreateSubCategoryComponent, {
      width: '300px'
    }).afterClosed()
      .subscribe((subCategory) => {
        if(subCategory){
          this.subCategoryCreate.emit({...subCategory, categoryId: this.categorySelected.id})
        }
      })
  }
}
