import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { OptionVotePair } from '../../models/option-vote-pair';
import { CommonModule, Location } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from 'firebase/firestore';
import { Vote } from '../../models/vote';
import { VotingActivePipe } from '../../pipes/voting-active.pipe';

@Component({
  selector: 'app-voting',
  imports: [CommonModule, MatCard, MatButtonModule, VotingActivePipe],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingComponent implements OnInit {
  @Input() options: OptionVotePair[] = [];
  @Input() votingCardId!: string | undefined;
  @Input() activeUntil!: Date;
  @Input() userId!: string;
  @Input() votes: Vote[] = [];

  @Output() addVote: EventEmitter<string> = new EventEmitter<string>();
  location = inject(Location);
  selectedOption!: string | null;

  async ngOnInit() {
    console.log(this.votes);
    this.selectedOption = this.votes?.find(voter => voter.userId === this.userId)?.option || null;
  }

  get totalVotes(): number {
    return this.options?.reduce((sum, option) => sum + option.votes, 0) || 0;
  }

  selectOption(option: OptionVotePair): void {
    if (!this.alreadyVoted) this.selectedOption = option.option;
  }

  onSave() {
    if (this.selectedOption) {
      this.votes.push({ userId: this.userId, option: this.selectedOption });
      const optionIndex = this.options.findIndex(option => option.option === this.selectedOption);
      if (optionIndex !== -1) {
        this.options[optionIndex].votes += 1;
      }
      this.addVote.emit(this.selectedOption);
    }
  }
  get alreadyVoted(): boolean {
    const index = this.votes.findIndex(vote => vote.userId === this.userId);
    if (index === -1) return false;
    return true;
  }

  goBack(): void {
    this.location.back();
  }
}
