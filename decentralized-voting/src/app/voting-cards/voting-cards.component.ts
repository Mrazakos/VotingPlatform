import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { VotingCard } from '../voting-card/model/voting-card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { VotingCardFilter, VotingCardService } from '../services/voting-card.service';
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
  onlyActive = signal<boolean>(false);
  onlyOwn = signal<boolean>(false);
  filteredVotingCards = signal<VotingCard[]>([]);

  constructor(private votingCardService: VotingCardService) {
    effect(() => {
      const filter = {
        searchQuery: this.searchQuery(),
        onlyActive: this.onlyActive(),
        onlyOwn: this.onlyOwn(),
        order: this.onlyActive() ? 'asc' : 'desc',
      } as VotingCardFilter;

      console.log('Filter:', filter);
      this.votingCardService.getVotingCards(filter).subscribe(votingCards => {
        this.votingCards.set(votingCards);
      });
    });
  }

  searchChanged($event: string) {
    this.searchQuery.set($event);
  }

  onlyActiveChecked($event: boolean) {
    this.onlyActive.set($event);
  }
  onlyOwnChecked($event: boolean) {
    this.onlyOwn.set($event);
  }
}
