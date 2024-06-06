import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-sub-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-sub-category.component.html',
  styleUrl: './create-sub-category.component.scss'
})
export class CreateSubCategoryComponent {

  subCategory: string = ""
  description: string = ""

  constructor(
    public dialogRef: MatDialogRef<CreateSubCategoryComponent>,
  ) {
  }

  createCategory(){
    const valid = this.validSubCategory()
    if(!valid) return
    this.dialogRef.close({
      name: this.subCategory,
      description: this.description
    })
  }

  validSubCategory(){
    if(this.subCategory.length === 0){
      alert('Subcategoria não pode ser vazia')
      return false
    }
    return true
  }
}
