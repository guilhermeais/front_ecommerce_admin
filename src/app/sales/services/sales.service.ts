import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SalesPage } from '../sales.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../../api';
import { LocalStorageService } from '../../@shared/services/local-storage';
import { salesMock } from './sales.mock';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private httpHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.localStorageService.get('user_logged_token')}`
    });
   }

  getSalesApi(queryString: string): Observable<SalesPage>{
    return of({
      total: 0,
      items: salesMock,
      currentPage: 0,
      page: 0
    })
    return this.http.get<SalesPage>(`${api}/admin/sales`, {
      headers: this.httpHeaders
    });
  }
}
