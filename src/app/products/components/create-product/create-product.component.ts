import { Component, OnDestroy } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Category, SubCategory } from '../../../root-category/root-category.intertface';
import { LocalStorageService, StorageKeys } from '../../../@shared/services/local-storage';
import { RootCategoryService } from '../../../root-category/root-category.service';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { SnackBarNotificationService } from '../../../@shared/services/snack-bar-notification.service';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnDestroy{

  formCreateProduct: FormGroup;
  categories: Category[] = []
  subCategories: SubCategory[] = []
  destroy$: Subject<void> = new Subject<void>();
  disabledSubCategory: boolean = true;

  constructor(
    private localStorage: LocalStorageService,
    private categoryService: RootCategoryService,
    private dialogRef: MatDialogRef<CreateProductComponent>,
    private snackBar: SnackBarNotificationService
  ) {
    this.buildForm();
    this.verifyCategoryList();
  }

  get imagePreview() {
    return this.formCreateProduct.get('image').value;
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

  showErrorWithoutCategory() {
    alert('Para cadastrar produtos é necessário ter pelo menos uma categoria cadastrada.');
  }

  buildForm() {
    this.formCreateProduct = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      subCategory: new FormControl({value: null, disabled: this.disabledSubCategory}, Validators.required),
      description: new FormControl(''),
      isShown: new FormControl(true),
      image: new FormControl(''),
    });
  }

  hasErrorFormControl(controlName: string) {
    return this.formCreateProduct.get(controlName)?.touched && this.formCreateProduct.get(controlName)?.invalid;
  }

  getErrorMessage(controlName: string) {
    if (this.formCreateProduct.get(controlName)?.hasError('required')) {
      return 'Campo obrigatório';
    }
    return '';
  }

  selectCategory(event: any) {
    const categoryId = event.target.value;
    this.activeSubcategorySelect(categoryId);
  }

  activeSubcategorySelect(categoryId: string) {
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
          this.formCreateProduct.get('subCategory')?.enable();
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

      if(!this.isImageFile(file)){
        this.snackBar.openErrorSnackBar('As imagens para o produto devem ser do tipo PNG ou JPG');
        return
      }

      if(file.size > 3 * 1024 * 1024){
        this.snackBar.openErrorSnackBar('O tamanho máximo para as imagens é de 3MB')
        return
      }

      reader.onload = (e) => {
        files.push({file, preview: reader.result})
      };
      reader.readAsDataURL(file);
    }
    
    this.formCreateProduct.get('image')?.setValue(files);
  }

  isImageFile(file: File): boolean {
    return file.type === 'image/jpeg' || file.type === 'image/png';
  }

  removeImage(image: AbstractControl){
    const images = this.formCreateProduct.controls['image'].value;
    const index = images.indexOf(image);
    images.splice(index, 1);
    this.formCreateProduct.get('image')?.setValue(images);
  }

  createProduct() {
    const formData = this.buildFormData();
    this.dialogRef.close(formData);
  }

  buildFormData() {
    const formData = new FormData();
    const formValue = this.formCreateProduct.value;

    formData.append('name', formValue.name);
    formData.append('price', formValue.price);
    formData.append('description', formValue.description);
    formData.append('subCategoryId', formValue.subCategory);
    formData.append('isShown', formValue.isShown);

    for (let i = 0; i < formValue.image.length; i++) {
      const file: File = formValue.image[i].file;
      formData.append('image', file);
    }

    return formData;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
