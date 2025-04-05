import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { VotingCard } from '../voting-card/model/voting-card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { VotingCardService } from '../services/voting-card.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search-component/search-component.component';
import { VotingCardListComponent } from './list-component/voting-card-list.component';

@Component({
  selector: 'app-voting-cards',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,

    FormsModule,
    SearchComponent,
    VotingCardListComponent,
  ],
  templateUrl: './voting-cards.component.html',
  styleUrl: './voting-cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingCardsComponent {
  votingCards = signal<VotingCard[]>([]);

  searchQuery = signal<string>('');
  filteredCards = signal<VotingCard[]>([]);

  constructor(private votingCardService: VotingCardService) {
    effect(() => {
      const query = this.searchQuery();
      this.votingCardService.getVotingCards(query).subscribe(cards => {
        this.votingCards.set(cards);
      });
    });
  }

  searchChanged($event: string) {
    this.searchQuery.set($event);
  }
}
