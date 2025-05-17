import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { VotingCardComponent } from '../voting-card/voting-card.component';
import { VotingCard } from '../voting-card/model/voting-card';
import { VotingCardFilter, VotingCardService } from '../services/voting-card.service';
import { Observable } from 'rxjs';
import { CarouselModule } from 'primeng/carousel'; // Import CarouselModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, // Mark the component as standalone
  imports: [CommonModule, VotingCardComponent, CarouselModule, MatCardModule], // Add CarouselModule here
})
export class DashboardComponent implements OnInit {
  votingCards$: Observable<VotingCard[]> = new Observable<VotingCard[]>();
  numVisibleCards: number = 2; // Number of cards to show at once

  constructor(private votingCardService: VotingCardService, private authService: AuthService) {}

  ngOnInit(): void {
    this.votingCards$ = this.votingCardService.getVotingCards({ top: 5 } as VotingCardFilter);
    this.getNumVisibleCards();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getNumVisibleCards();
  }

  getNumVisibleCards() {
    if (window.innerWidth <= 780) {
      this.numVisibleCards = 1;
    } else if (window.innerWidth <= 1440) {
      this.numVisibleCards = 2;
    } else {
      this.numVisibleCards = 3;
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}
