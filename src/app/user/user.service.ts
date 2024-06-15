import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {User, UserInvites, UserInvitesResponse, UserSearchOptions} from "./user.interface";
import {api} from "../api";
import {SnackBarNotificationService} from "../@shared/services/snack-bar-notification.service";
import {LocalStorageService, StorageKeys} from "../@shared/services/local-storage";
import {UserInvited} from "./components/user-list-invites/user-list-invites.component";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_list_invites$: BehaviorSubject<UserInvites[]> = new BehaviorSubject<UserInvites[]>([]);
  headers: HttpHeaders
  constructor(
    private http: HttpClient,
    private snackBarService: SnackBarNotificationService,
    private localStorageService: LocalStorageService
  ) {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.localStorageService.get(StorageKeys.user_logged_token)}`
    })
  }

  getUserLoggedInfoHttp(): Observable<User>{
    return this.http.get<User>(`${api}/user`, {
      headers: this.headers
    })
  }

  getUserInvitesListHttp(paginationOptions?: UserSearchOptions): Observable<UserInvites[]>{
    return this.http.get<UserInvitesResponse>(`${api}/admin/sign-up/invites`, {
      headers: this.headers
    })
      .pipe(
        map((response: UserInvitesResponse) => response.items)
      );
  }

  sendInviteHttp(credentials: UserInvited): Observable<any>{
    console.log(credentials);
    
    return this.http.post(`${api}/admin/sign-up/invites`, credentials, {
      headers: this.headers
    })
  }

  attListInvites$(list: UserInvites[]){
    this.user_list_invites$.next(list);
    this.localStorageService.set(StorageKeys.user_invites_list, list);
  }

  addToList$(list: UserInvites){
    const currentList = this.user_list_invites$.value;
    this.user_list_invites$.next([list, ...currentList]);
    this.localStorageService.set('user_invites_list', [list, ...currentList]);
  }


}
