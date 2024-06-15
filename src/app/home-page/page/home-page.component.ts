import { Component } from '@angular/core';
import {SidebarComponent} from "../components/sidebar/sidebar.component";
import {ChatComponent} from "../../chat/components/chat/chat.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SidebarComponent,
    ChatComponent,
    RouterOutlet
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
