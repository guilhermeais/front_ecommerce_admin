import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-dark-mode',
  standalone: true,
  imports: [],
  templateUrl: './toggle-dark-mode.component.html',
  styleUrl: './toggle-dark-mode.component.scss'
})
export class ToggleDarkModeComponent {
  darkMode: boolean = false;

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.toggle('dark-theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.toggle('dark-theme');
    }
  }
}
