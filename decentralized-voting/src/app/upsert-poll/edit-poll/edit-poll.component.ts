import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { VotingCardService } from '../../services/voting-card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { VotingCardUpsert } from '../model/voting-card-upsert';

@Component({
  selector: 'app-edit-poll',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './edit-poll.component.html',
  styleUrls: ['./edit-poll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPollComponent {
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private votingCardService: VotingCardService,
    private snackBar: MatSnackBar
  ) {}
  id: string | null = '';
  card: VotingCardUpsert | null = null;

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      activeUntil: [null, Validators.required],
    });

    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.id = params.get('id');
          return this.votingCardService.getVotingCardById(this.id!);
        })
      )
      .subscribe(card => {
        const date = new Date(card?.activeUntil || Date.now());
        this.form.patchValue({
          title: card?.title,
          description: card?.description,
          activeUntil: date,
        });
        this.card = card;
      });
  }

  onSubmit() {
    this.card!.title = this.form.value.title;
    this.card!.description = this.form.value.description;
    this.card!.activeUntil = this.form.value.activeUntil;
    this.votingCardService.updateVotingCard(this.id!, this.card!).then(() => {
      this.snackBar.open('Voting card updated successfully!', 'Close', {
        duration: 2000,
      });
    });
  }
}
