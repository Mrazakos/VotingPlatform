import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { VotingCard } from '../../voting-card/model/voting-card';
import { CommonModule } from '@angular/common';
import { VotingCardComponent } from '../../voting-card/voting-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-voting-card-list',
  imports: [MatGridListModule, CommonModule, VotingCardComponent, MatPaginatorModule],
  templateUrl: './voting-card-list.component.html',
  styleUrl: './voting-card-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotingCardListComponent implements OnChanges {
  @Input() votingCards: VotingCard[] = [];
  pageIndex: number = 0;
  pageSize: number = 6;
  paginatedVotingCards: VotingCard[] = [];
  gridColumns: number = this.getGridColumns();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['votingCards']) {
      this.paginate();
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.gridColumns = this.getGridColumns();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.paginate();
  }

  private paginate() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedVotingCards = this.votingCards.slice(startIndex, endIndex);
  }

  getGridColumns() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 620) {
      return 1; // 1 column on small screens
    } else if (screenWidth <= 1440) {
      return 2; // 2 columns on medium screens
    } else {
      return 3; // 3 columns on larger screens
    }
  }
}
