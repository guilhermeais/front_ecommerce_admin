import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Dialog} from "@angular/cdk/dialog";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-send-invite',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-send-invite.component.html',
  styleUrl: './user-send-invite.component.scss'
})
export class UserSendInviteComponent {
  name: string = '';
  email: string = '';

  constructor(
    public dialogRef: MatDialogRef<UserSendInviteComponent>,
  ) {}

  clickToSendInvite(){
    this.dialogRef.close({
      name: this.name,
      email: this.email
    });
  }

  clickToCloseDialog(){
    this.dialogRef.close(null);
  }
}
