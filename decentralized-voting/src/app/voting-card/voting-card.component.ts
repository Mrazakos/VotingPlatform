import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Sometimes necessary
import { RouterModule } from '@angular/router';
import { VotingCard } from './model/voting-card';

@Component({
  selector: 'app-voting-card',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './voting-card.component.html',
  styleUrl: './voting-card.component.css',
  styles: ['src/styles']
})

export class VotingCardComponent {
  @Input() votingCard!: VotingCard;
    title = 'Best Movie of the Year';
    description = 'Vote for your favorite movie from the list below!';
    imageSrc = 'assets/voting-movie.jpg';
    voteId = 1;
  
    voteOptions = [
      { name: 'Movie A', votes: 30 },
      { name: 'Movie B', votes: 70 },
      { name: 'Movie C', votes: 50 },
    ];
  
    get totalVotes(): number {
      return this.voteOptions.reduce((sum, option) => sum + option.votes, 0);
    }
  }