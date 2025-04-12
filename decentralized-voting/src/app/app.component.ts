import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth/services/auth.service';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, MatToolbarModule, RouterModule, MatSidenavModule, MatIconModule],
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  title = 'decentralized-voting';
  constructor(private authService: AuthService) {}

  isSidenavOpen: boolean = true; // Sidebar starts open
  sidenavMode: MatDrawerMode = 'side';
  ngOnInit() {
    this.updateSidenavMode(); // Set initial sidenav mode based on window size
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSidenavMode();
  }

  // Check window width and update sidenav mode
  updateSidenavMode() {
    if (window.innerWidth < 1440) {
      this.sidenavMode = 'over'; // Use 'over' for small screens
    } else {
      this.sidenavMode = 'side'; // Use 'side' for larger screens
    }
  }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  onLogout(): void {
    this.authService.logout();
  }
}
