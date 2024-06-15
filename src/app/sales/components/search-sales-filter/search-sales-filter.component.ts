import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { SearchSalesEvent } from '../../sales.interface';

@Component({
  selector: 'app-search-sales-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatLabel,
    MatHint,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  templateUrl: './search-sales-filter.component.html',
  styleUrl: './search-sales-filter.component.scss'
})
export class SearchSalesFilterComponent {

  @Output() sendSearchSalesEvent: EventEmitter<SearchSalesEvent> = new EventEmitter();

  formSearchSales: FormGroup;

  constructor(){
    this.formSearchSales = new FormGroup({
      start_date: new FormControl(new Date()),
      end_date: new FormControl(new Date()),
    });
  }

  searchSales(){
    this.formatDateToIsoString();
    const searchSalesEvent: SearchSalesEvent = {
      start_date: this.formSearchSales.get('start_date').value,
      end_date: this.formSearchSales.get('end_date').value
    }
    this.sendSearchSalesEvent.emit(searchSalesEvent);
  }

  formatDateToIsoString(){
    const start_date = this.formSearchSales.get('start_date').value;
    const end_date = this.formSearchSales.get('end_date').value;
    this.formSearchSales.get('start_date').setValue(new Date(start_date).toISOString().split('T')[0] + 'T00:00:01');
    this.formSearchSales.get('end_date').setValue(new Date(end_date).toISOString().split('T')[0] + 'T23:59:59');
  }
}

