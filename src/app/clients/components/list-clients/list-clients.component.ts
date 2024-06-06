import {Component, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatInput} from "@angular/material/input";


@Component({
  selector: 'app-list-clients',
  standalone: true,
  templateUrl: './list-clients.component.html',
  imports: [
    MatFormField,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatInput,
    MatHeaderRow,
    MatRow,
    MatLabel,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRowDef
  ],
  styleUrl: './list-clients.component.scss'
})
export class ListClientsComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone'];
  dataSource: MatTableDataSource<any>;
  ELEMENT_DATA: any[] = [
    { id: 1, email: "exemplo1@email.com", name: "Guilherme Ferreira", phone: "123456789"},
    { id: 2, email: "exemplo2@email.com", name: "Ana Beatriz", phone: "987654321"},
    { id: 3, email: "exemplo3@email.com", name: "Camila Alves", phone: "123456789"},
    { id: 4, email: "exemplo1@email.com", name: "Fernando Machado", phone: "123456789"},
    { id: 5, email: "exemplo2@email.com", name: "Fernanda da Cunha", phone: "987654321"},
    { id: 6, email: "exemplo3@email.com", name: "Jessica Almeida", phone: "123456789"},
    { id: 7, email: "exemplo1@email.com", name: "Gabriel Jesus", phone: "123456789"},
    { id: 8, email: "exemplo2@email.com", name: "Vitor Amaral", phone: "987654321"},
    { id: 9, email: "exemplo3@email.com", name: "Joice Batista", phone: "123456789"},
  ];

  constructor() {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
