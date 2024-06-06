import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {CepResponseApi, CepResponsePipe, singupRequest, singupResponse} from "./singup.interface";
import {api} from "../api";
import {SnackBarNotificationService} from "../@shared/services/snack-bar-notification.service";

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarNotificationService
  ) { }

  getCEP(cep: string) : Observable<CepResponsePipe> {
    return this.http.get<CepResponsePipe>(`https://viacep.com.br/ws/${cep}/json/`)
      .pipe(
        catchError((error) => {
          return of(error);
        }),
        map((response: CepResponseApi) => {
            return {
              address: response.logradouro,
              state: response.uf,
              city: response.localidade,
            }
          }
        )
      );
  }

  singup(singupRequest: singupRequest, invitedId: string): Observable<singupResponse> {
    return this.http.post<singupResponse>(`${api}/admin/sign-up/invites/${invitedId}/finish`, singupRequest)
  }
}
