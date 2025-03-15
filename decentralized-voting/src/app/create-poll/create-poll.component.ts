import { Component } from '@angular/core';
import { VotingCard } from '../voting-card/model/voting-card';
import { VotingCardService } from '../services/voting-card.service';
import { VotingType } from '../models/voting-type';
import { OptionVotePair } from '../models/option-vote-pair';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
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
  styles: ['src/styles'],
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent {
  public get votingCardService(): VotingCardService {
    return this._votingCardService;
  }
  public set votingCardService(value: VotingCardService) {
    this._votingCardService = value;
  }
  newVotingCard: VotingCard = {
    title: '',
    description: '',
    imageSrc: '',
    type: VotingType.poll,
    options: [] // Make sure options is an empty array at first
  };

  constructor(private _votingCardService: VotingCardService) {}
  

  onSubmit() {
    // Split options and initialize with 0 votes
    const optionsArray = this.newVotingCard.options
      .map(option => option.trim())
      .map(option => ({ option, votes: 0 })); // Initialize votes to 0

    // Set the options in the VotingCard object
    this.newVotingCard.options = optionsArray as OptionVotePair[];

    // Call the service to add the new VotingCard
    this.votingCardService.addVotingCard(this.newVotingCard).then(() => {
      console.log('New voting card created!');
      // Reset the form after successful submission
      this.newVotingCard = { title: '', description: '', imageSrc: '', options: [], type: VotingType.default};
    }).catch((error) => {
      console.error('Error creating voting card:', error);
    });
  }
}
