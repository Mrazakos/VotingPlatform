import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import {VotingCardComponent} from '../voting-card/voting-card.component'
import { VotingCard } from '../voting-card/model/voting-card';
import { VotingType } from '../models/voting-type';
import { CommonModule } from '@angular/common';
import { VotingCardService } from '../services/voting-card.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [VotingCardComponent,
    CommonModule
  ]
})
export class DashboardComponent {

  votingCards$!: Observable<VotingCard[]>;

  constructor(private votingCardService: VotingCardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.votingCards$ = this.votingCardService.getVotingCards();
  }

  onLogout(): void {
    this.authService.logout();
  }
}
