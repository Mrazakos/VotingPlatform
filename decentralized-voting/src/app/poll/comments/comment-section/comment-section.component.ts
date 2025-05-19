import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommentService } from '../service/comment.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Comment } from '../model/comment';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comment-section',
  imports: [CommentInputComponent, MatCardModule, DatePipe, CommonModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentSectionComponent {
  constructor(private commentService: CommentService, private auth: AuthService) {}

  @Input() pollId!: string;
  @Input() comments: Comment[] = [];

  addComment(content: string) {
    this.auth
      .getUser()
      .then(user => {
        if (user) {
          const comment: Comment = {
            content: content,
            votingCardId: this.pollId,
            createdUserId: user.uid as string,
            createdUserEmail: user.email as string,
            createdAt: new Date(),
          };
          this.commentService.addComment(comment);
          this.comments.unshift(comment);
        } else {
          console.error('User is not logged in');
        }
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      }); // Added catch block to handle errors
  }
}
