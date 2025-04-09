import { Component, Input, OnInit } from '@angular/core';
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
import { OptionVotePair } from '../models/option-vote-pair';
import { VotingTypeImagePipe } from '../pipes/voting-type-image.pipe';

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
    VotingTypeImagePipe,
  ],
  templateUrl: './voting-card.component.html',
  styleUrl: './voting-card.component.css',
  styles: ['src/styles'],
})
export class VotingCardComponent implements OnInit {
  @Input() votingCard!: VotingCard;
  topOptions: OptionVotePair[] = [];
  descBeginning: string = '';

  ngOnInit(): void {
    var options = this.votingCard.options;
    options?.sort((a, b) => (a.votes > b.votes ? -1 : 1));
    this.topOptions = options.slice(0, 3);
    this.descBeginning = this.votingCard.description.substring(0, 50) + '...';
  }
}
