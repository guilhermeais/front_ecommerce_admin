import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LoginRequest, LoginResponse} from "./login.interface"
import {HttpClient} from "@angular/common/http";
import {api} from "../api";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${api}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
