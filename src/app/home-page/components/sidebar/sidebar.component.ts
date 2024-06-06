import { Component } from '@angular/core';
import {ToggleDarkModeComponent} from "../../../@shared/components/toggle-dark-mode/toggle-dark-mode.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {LocalStorageService} from "../../../@shared/services/local-storage";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ToggleDarkModeComponent,
    RouterLink,
    RouterLinkActive,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatButton
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(
    private localStorage: LocalStorageService,
    private route: Router
  ) {
  }
  logout(){
    this.localStorage.clear()
    this.route.navigate(['/login'])
  }
}
