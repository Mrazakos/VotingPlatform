import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './auth/services/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    imports: [RouterOutlet,
      MatToolbarModule,
      RouterModule,
      MatSidenavModule
    ],
    styles: ['src/styles.css'],
    styleUrl: './app.component.css',
    standalone: true
})
export class AppComponent {
  isLoggedIn: boolean = false
  title = 'decentralized-voting';
  constructor(
    private authService: AuthService,
  ){}

  onLogout(): void {
    this.authService.logout();
  }
}
