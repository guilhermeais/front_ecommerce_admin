import { Component, Inject} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Category, SubCategory } from '../../../root-category/root-category.intertface';
import { LocalStorageService, StorageKeys } from '../../../@shared/services/local-storage';
import { RootCategoryService } from '../../../root-category/root-category.service';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ItensProductData } from '../../product';


@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  formEditProduct: FormGroup;
  categories: Category[] = []
  subCategories: SubCategory[] = []
  destroy$: Subject<void> = new Subject<void>();
  disabledSubCategory: boolean = false;

  constructor(
    private localStorage: LocalStorageService,
    private categoryService: RootCategoryService,
    private dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public productData: ItensProductData
  ) {
    this.buildForm();
    this.verifyCategoryList();
    this.verifySubCategory(this.productData.category.id);
  }

  get imagesPreview() {
    return this.formEditProduct.controls['image'].value ?? [];
  }

  get imageInForm(){
    return this.formEditProduct.controls['image'].value ?? null;
  }
  
  buildForm() {
    this.formEditProduct = new FormGroup({
      name: new FormControl(this.productData.name, Validators.required),
      price: new FormControl(this.productData.price, Validators.required),
      description: new FormControl(this.productData.description),
      subCategory: new FormControl({value: this.productData.category.id, disabled: this.disabledSubCategory}, Validators.required),
      category: new FormControl(this.productData.category.rootCategory.id, Validators.required),
      image: new FormControl(this.productData.image),
    });
  }

  verifyCategoryList() {
    const localCategory = this.localStorage.get(StorageKeys.categoryList);

    if(localCategory && localCategory.length > 0) {
      this.categories = localCategory;
      return;
    }

    this.categoryService.getCategoriesHttp()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value.length === 0) {
            this.showErrorWithoutCategory();
          }
          this.categories = value;
          this.localStorage.set(StorageKeys.categoryList, value);
        },
      });
  }

  verifySubCategory(categoryId: string) {   
    this.categoryService.getSubCategoriesHttp(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.subCategories = value;
        },
        error: (error) => {
          alert('Erro ao buscar subcategorias');
        }
      });
  }

  showErrorWithoutCategory() {
    alert('Para editar produtos é necessário ter pelo menos uma categoria cadastrada.');
  }

  hasErrorFormControl(controlName: string) {
    return this.formEditProduct.get(controlName)?.touched && this.formEditProduct.get(controlName)?.invalid;
  }

  getErrorMessage(controlName: string) {
    if (this.formEditProduct.get(controlName)?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return '';
  }

  selectCategory(event: any) {
    console.log('SELECT: ', event.target.value);
    
    const categoryId = event.target.value;
    this.activeSubcategorySelect(categoryId);
  }

  activeSubcategorySelect(categoryId: string) {
    console.log('OPA');
    
    this.categoryService.getSubCategoriesHttp(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if(value.length === 0) {
            alert('Não há subcategorias cadastradas para essa categoria');
            this.subCategories = [];
            return
          }
          this.subCategories = value;
          this.formEditProduct.get('subCategory')?.enable();
          console.log('SUB: ',this.subCategories);
          
        },
        error: (error) => {
          alert('Erro ao buscar subcategorias');
        }
      });
  }

  processFilesSelected(event: any) {
    const files: any[] = []

    for (let i = 0; i < event.target.files.length; i++) {
      const reader = new FileReader();
      const file: File = event.target.files[i];

      if(this.isImageFile(file)){
        reader.onload = (e) => {
          files.push({file, preview: reader.result})
        };
        reader.readAsDataURL(file);
      }else{
        this.alertErrorFileIsNotImage();
      }
    }
    
    this.formEditProduct.get('image')?.setValue(files);
    
    console.log('IMAGES: ', this.formEditProduct.controls['image'].value);   
  }

  isImageFile(file: File): boolean {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  }

  removeImage(){
    this.formEditProduct.get('image')?.setValue(null);
  }

  editProduct() {
    const formData = this.buildFormData();
    this.dialogRef.close({formData, id: this.productData.id});
  }

  buildFormData() {
    const formData = new FormData();
    const formValue = this.formEditProduct.value;

    formData.append('name', formValue.name);
    formData.append('price', formValue.price);
    formData.append('description', formValue.description);
    formData.append('subCategoryId', formValue.subCategory);

    if(this.imageInForm){
      const file: File = this.formEditProduct.controls['image'].value
      formData.append('image', file);
    }

    return formData;
  }

  alertErrorFileIsNotImage() {
    alert('As imagens para o produto devem ser do tipo PNG ou JPG');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
