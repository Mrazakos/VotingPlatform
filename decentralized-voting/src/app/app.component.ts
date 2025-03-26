import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth/services/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, MatToolbarModule, RouterModule, MatSidenavModule, MatIconModule],
  styles: ['src/styles.css'],
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  isLoggedIn: boolean = false;
  title = 'decentralized-voting';
  constructor(private authService: AuthService) {}

  isSidenavOpen = true; // Sidebar starts open

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
