import {Injectable, Signal} from '@angular/core';
import {UserData} from "./clients-interface";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  clientsList: BehaviorSubject<UserData[]> = new BehaviorSubject([])
  constructor(
    private http: HttpClient
  ) { }

  getClientsState() {
    return this.clientsList.asObservable();
  }

  setClientsState(clients: UserData[]) {
    this.clientsList.next(clients);
  }

  getClients(): Observable<UserData[]>{
    return this.http.get<UserData[]>('https://api.com/clients')
  }
}
