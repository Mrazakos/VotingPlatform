import { Component } from '@angular/core';
import { VotingCardService } from '../../services/voting-card.service';
import { VotingType, VotingTypeMap, VotingTypeImageSrcMap } from '../../models/voting-type';
import { OptionVotePair } from '../../models/option-vote-pair';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../auth/services/auth.service';
import { VotingCardUpsert } from '../model/voting-card-upsert';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatDatepickerModule,
    MatSelectModule,
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
  newVotingCard: VotingCardUpsert = {
    title: '',
    description: '',
    votes: [],
    type: VotingType.poll,
    options: [],
    createdUserId: '',
    activeUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdDate: new Date(Date.now()),
  };
  votingTypeImageSrcMap: Record<VotingType, string> = VotingTypeImageSrcMap;
  votingTypeMap: Record<VotingType, string> = VotingTypeMap;
  votingTypes: VotingType[] = [
    VotingType.election,
    VotingType.survey,
    VotingType.opinion,
    VotingType.poll,
  ];

  constructor(
    private _votingCardService: VotingCardService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  async onSubmit(): Promise<void> {
    this.initializeOptions(this.options);
    this.newVotingCard.createdUserId = await this.authService.getUserId();
    this.votingCardService
      .addVotingCard(this.newVotingCard)
      .then(() => {
        this.snackBar.open('Voting card created successfully!', 'Close', {
          duration: 3000,
        });
        this.newVotingCard = {
          title: '',
          description: '',
          votes: [],
          type: VotingType.poll,
          options: [],
          createdUserId: '',
          activeUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        this.options = '';
      })
      .catch(error => {
        this.snackBar.open('Error creating voting card', 'Close', {
          duration: 5000,
        });
        console.error('Error creating voting card:', error);
      });
  }
  private initializeOptions(options: string) {
    const optionsArray = options.split(',');
    console.log(optionsArray);
    optionsArray.forEach(element => {
      let option = { option: element.trim(), votes: 0 } as OptionVotePair;
      this.newVotingCard.options.push(option);
    });
  }
}
