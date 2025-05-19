import { ChangeDetectionStrategy, Component } from '@angular/core';
import { VotingCard } from '../voting-card/model/voting-card';
import { ActivatedRoute, Router } from '@angular/router';
import { VotingCardService } from '../services/voting-card.service';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../auth/services/auth.service';
import { VotingComponent } from './voting/voting.component';
import { VotingService } from './service/voting.service';
import { VotingType } from '../models/voting-type';
import { MatButtonModule } from '@angular/material/button';
import { VotingTypeImagePipe } from '../pipes/voting-type-image.pipe';
import { CommentSectionComponent } from './comments/comment-section/comment-section.component';
import { CommentService } from './comments/service/comment.service';
import { Comment } from './comments/model/comment';

@Component({
  selector: 'app-poll',
  imports: [
    CommonModule,
    MatCardModule,
    VotingComponent,
    MatButtonModule,
    VotingTypeImagePipe,
    CommentSectionComponent,
  ],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollComponent {
  pollId!: string;
  pollData$!: Observable<VotingCard | null>;
  userId!: string;

  isUsersPoll: boolean = false;
  comments$: Observable<Comment[]> = new Observable<Comment[]>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private votingCardService: VotingCardService,
    private authService: AuthService,
    private votingService: VotingService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.pollId = params.get('id')!;
      if (this.pollId) {
        this.pollData$ = this.votingCardService.getVotingCardById(this.pollId);
        this.comments$ = this.commentService.getComments(this.pollId);
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
