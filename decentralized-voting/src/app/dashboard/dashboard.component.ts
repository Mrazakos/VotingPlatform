import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {VotingCardComponent} from '../voting-card/voting-card.component'
import { VotingCard } from '../voting-card/model/voting-card';
import { VotingType } from '../models/voting-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [VotingCardComponent,
    CommonModule
  ]
})
export class DashboardComponent {
  votingCards: VotingCard[] = []
  constructor(private authService: AuthService) {
    this.votingCards.push({ votingCardId: 1, title: "Teszt", description:"Ez egy teszt kártya", options: [{option: "asd", votes: 3}, {option: "test", votes: 7}], type: VotingType.election})
    console.log(this.votingCards)
  }

  onLogout(): void {
    this.authService.logout();
  }
}
