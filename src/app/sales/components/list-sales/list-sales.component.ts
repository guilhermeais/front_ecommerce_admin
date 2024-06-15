import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Sales } from '../../sales.interface';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TruncatePipe } from '../../../@shared/pipes/truncate.pipe';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-list-sales',
  standalone: true,
  imports: [
    MatTableModule,
    TruncatePipe,
    CurrencyPipe,
    DatePipe,
    MatMenuModule,
    MatIcon
  ],
  templateUrl: './list-sales.component.html',
  styleUrl: './list-sales.component.scss'
})
export class ListSalesComponent implements OnChanges{
  @Input({required: true}) salesList: Sales[]
  @Output() viewMoreEvent: EventEmitter<Sales> = new EventEmitter<Sales>();
  displayedColumns = ['cod', 'status', 'payment', 'total', 'actions'];
  dataSource: MatTableDataSource<Sales>;

  constructor() { }

  ngOnChanges(){
    this.dataSource = new MatTableDataSource(this.salesList);    
  }

  sendViewMoreEvent(sale: Sales){
    this.viewMoreEvent.emit(sale);
  }


}
