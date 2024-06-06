import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Dialog} from "@angular/cdk/dialog";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-send-invite',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-send-invite.component.html',
  styleUrl: './user-send-invite.component.scss'
})
export class UserSendInviteComponent {
  guestName: string;
  guestEmail: string;

  constructor(
    public dialogRef: MatDialogRef<UserSendInviteComponent>,
  ) {
  }

  clickToSendInvite(){
    this.dialogRef.close({
      name: this.guestName,
      email: this.guestEmail
    });
  }

  clickToCloseDialog(){
    this.dialogRef.close(null);
  }
}
