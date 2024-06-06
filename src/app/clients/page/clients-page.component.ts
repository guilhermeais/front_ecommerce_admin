import { Component } from '@angular/core';
import {ListClientsComponent} from "../components/list-clients/list-clients.component";

@Component({
  selector: 'app-clients-page',
  standalone: true,
  templateUrl: './clients-page.component.html',
  imports: [
    ListClientsComponent
  ],
  styleUrl: './clients-page.component.scss'
})
export class ClientsPageComponent {


  confirmDialog() {

  }

  closeDialog() {

  }
}
