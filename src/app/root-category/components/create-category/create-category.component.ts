import {Component, Inject, Output} from '@angular/core';
import {Dialog} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  category: string = ""
  description: string = ""

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
  ) {
  }

  createCategory(){
    const valid = this.validateCategory()
    if(!valid) return
    this.dialogRef.close({
      name: this.category,
      description: this.description
    })
  }

  validateCategory(){
    if(this.category.length === 0){
      alert('Categoria não pode ser vazia')
      return false
    }
    return true
  }
}
