import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sales } from '../../sales.interface';
import { User } from '../../../user/user.interface';
import { LocalStorageService, StorageKeys } from '../../../@shared/services/local-storage';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-view-more',
  standalone: true,
  imports: [
    MatIcon,
    CurrencyPipe,
    MatTableModule,
  ],
  templateUrl: './view-more.component.html',
  styleUrl: './view-more.component.scss'
})
export class ViewMoreComponent {

  userInfo: User
  itemSalesDisplayedColumns = ['product_name', 'product_image', 'quantity', 'price']

  constructor(
    private dialogRef: MatDialogRef<ViewMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sales,
    private localStorage: LocalStorageService
  ){
    this.userInfo = this.localStorage.get(StorageKeys.user_logged_info);
  }

  get addressInfoLine(){
    return this.data.deliveryAddress.address + ', '
      + this.data.deliveryAddress.number + ' - '
      + this.data.deliveryAddress.city + '/'
      + this.data.deliveryAddress.state + ', '
      + this.data.deliveryAddress.cep
  }
}
