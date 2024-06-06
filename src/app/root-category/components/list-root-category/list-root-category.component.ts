import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../root-category.intertface";
import {RootCategoryService} from "../../root-category.service";
import {HttpClientModule} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-list-root-category',
  standalone: true,
  imports: [
    HttpClientModule,
    AsyncPipe
  ],
  providers: [
    RootCategoryService
  ],
  templateUrl: './list-root-category.component.html',
  styleUrl: './list-root-category.component.scss'
})
export class ListRootCategoryComponent {
  @Input() categories: Category[];
  @Output() categorySelected?: EventEmitter<string> = new EventEmitter<string>();


  selectedCategory(event: Event){
    this.categorySelected.emit((event.target as HTMLInputElement).value);
  }
}

