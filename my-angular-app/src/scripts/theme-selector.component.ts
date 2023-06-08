import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './themes/theme-selector.component.html',
  styleUrls: ['./themes/theme-selector.component.css']
})
export class ThemeSelectorComponent {
  changeTheme(theme: string): void {
    // Set the selected theme by updating the data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
  }
}
