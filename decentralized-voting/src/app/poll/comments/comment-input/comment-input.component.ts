import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-comment-input',
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentInputComponent {
  @Output() commentSubmitted: EventEmitter<string> = new EventEmitter<string>();
  comment: string = '';

  addComment() {
    this.commentSubmitted.emit(this.comment); // Clear the input after submission
    this.comment = '';
  }
}
