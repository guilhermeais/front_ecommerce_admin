import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserInvites} from "../../user.interface";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {UserSendInviteComponent} from "./user-send-invite/user-send-invite.component";
import {UserService} from "../../user.service";
import {Subject, takeUntil} from "rxjs";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-user-list-invites',
  standalone: true,
  imports: [
    DatePipe,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanelDescription,
    MatIcon
  ],
  templateUrl: './user-list-invites.component.html',
  styleUrl: './user-list-invites.component.scss'
})
export class UserListInvitesComponent {
  @Input() user_invites_list: UserInvites[];
  @Output() user_invited: EventEmitter<UserInvited> = new EventEmitter<UserInvited>()
  error_list_invites_message: string = 'Ops, não foi possível carregar as informações dos convites. Tente daqui uns instantes.';
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {
    this.observeUserInvitesList();
  }

  observeUserInvitesList(){
    this.userService.user_list_invites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user_invites_list => {
        this.user_invites_list = user_invites_list;
      })
  }

  openDialogSendInvite(){
    const dialogRef = this.dialog.open(UserSendInviteComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.user_invited.emit(result);
      }
      return;
    });
  }
}

export interface UserInvited {
  email: string
  name: string
}
