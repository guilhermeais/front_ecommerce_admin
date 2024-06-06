import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const keyStorage = localStorage.getItem(key);
    return keyStorage ? JSON.parse(keyStorage) : null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  has(key: string) {
    return localStorage.hasOwnProperty(key);
  }

  keys() {
    return Object.keys(localStorage);
  }
}
export enum StorageKeys {
  user_logged_info = 'user_logged_info',
  user_logged_token = 'user_logged_token',
  user_invites_list = 'user_invites_list',
  products_list = 'products_list',
  sales_list = 'sales_list',
  categoryList = 'category_list',
  subCategoryList = 'sub_category_list',
}
