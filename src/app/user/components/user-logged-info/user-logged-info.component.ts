import {Component, Input} from '@angular/core';
import {User} from "../../user.interface";

@Component({
  selector: 'app-user-logged-info',
  standalone: true,
  imports: [],
  templateUrl: './user-logged-info.component.html',
  styleUrl: './user-logged-info.component.scss'
})
export class UserLoggedInfoComponent {
  @Input() user_looged_info: User;
  error_logged_user_info_message: string = 'Ops, não foi possível carregar as informações do usuário. Tente novamente mais tarde.';

  protected readonly Array = Array;
}
