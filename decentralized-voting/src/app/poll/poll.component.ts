import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VotingCard } from '../voting-card/model/voting-card';
import { ActivatedRoute, Router } from '@angular/router';
import { VotingCardService } from '../services/voting-card.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { VotingComponent } from './voting/voting.component';
import { VotingService } from './service/voting.service';
import { VotingType, VotingTypeImageSrcMap } from '../models/voting-type';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-poll',
  imports: [CommonModule, MatCardModule, VotingComponent, MatButtonModule],
  templateUrl: './poll.component.html',
  styles: ['src/styles.css'],
  styleUrl: './poll.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollComponent {
  pollId!: string;
  pollData$!: Observable<VotingCard | null>;
  userId!: string;
  votingTypeImageSrcMap: Record<VotingType, string> = VotingTypeImageSrcMap;

  isUsersPoll: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private votingCardService: VotingCardService,
    private authService: AuthService,
    private votingService: VotingService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.pollId = params.get('id')!;
      if (this.pollId) {
        this.pollData$ = this.votingCardService.getVotingCardById(this.pollId);
      }
      this.getUserData();
    });
  }
  async getUserData() {
    this.userId = (await this.authService.getUserId()) as string;
  }

  vote(option: string): void {
    this.votingService.vote(this.pollId, option);
  }

  delete(): void {
    this.votingCardService.deleteVotingCard(this.pollId);
  }
  edit(): void {
    this.router.navigate(['/edit-poll', this.pollId]);
  }
}
