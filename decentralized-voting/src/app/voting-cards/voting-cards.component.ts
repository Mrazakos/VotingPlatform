import { ChangeDetectionStrategy, Component, effect, signal, Signal } from '@angular/core';
import { VotingCard } from '../voting-card/model/voting-card';
import { map, Observable, switchMap, withLatestFrom } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { VotingCardService } from '../services/voting-card.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { VotingCardComponent } from '../voting-card/voting-card.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search-component/search-component.component';

@Component({
  selector: 'app-voting-cards',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    VotingCardComponent,
    FormsModule,
    SearchComponent,
  ],
  templateUrl: './voting-cards.component.html',
  styleUrl: './voting-cards.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingCardsComponent {
  votingCards$!: Observable<VotingCard[]>;

  searchQuery = signal<string>('');
  filteredCards = signal<VotingCard[]>([]);

  pageSize = signal<number>(5);
  currentPage = signal<number>(0);

  paginatedVotingCards$: Observable<VotingCard[]> = this.votingCards$;

  constructor(private votingCardService: VotingCardService) {
    // Fetch all voting cards once
    this.votingCards$ = this.votingCardService.getVotingCards();
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
  searchChanged($event: string) {
    this.searchQuery.set($event);
  }
}
