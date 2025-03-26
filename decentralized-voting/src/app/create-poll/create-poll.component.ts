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
  styleUrls: ['./create-poll.component.css'],
})
export class CreatePollComponent {
  public get votingCardService(): VotingCardService {
    return this._votingCardService;
  }
  public set votingCardService(value: VotingCardService) {
    this._votingCardService = value;
  }
  options: string = '';
  newVotingCard: VotingCard = {
    title: '',
    description: '',
    imageSrc: '',
    type: VotingType.poll,
    options: [],
  };

  constructor(private _votingCardService: VotingCardService) {}

  onSubmit(): void {
    this.initializeOptions(this.options);
    this.votingCardService
      .addVotingCard(this.newVotingCard)
      .then(() => {
        console.log('New voting card created!');
        this.newVotingCard = {
          title: '',
          description: '',
          imageSrc: '',
          options: [],
          type: VotingType.default,
        };
        this.options = '';
      })
      .catch(error => {
        console.error('Error creating voting card:', error);
      });
  }
  private initializeOptions(options: string) {
    const optionsArray = options.split(',');
    optionsArray.forEach(element => {
      let option = { option: element.trim(), votes: 0 } as OptionVotePair;
      this.newVotingCard.options.push(option);
    });
  }
}
