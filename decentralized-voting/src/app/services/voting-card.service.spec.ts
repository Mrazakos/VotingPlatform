import { TestBed } from '@angular/core/testing';

import { VotingCardService } from './voting-card.service';

describe('VotingCardService', () => {
  let service: VotingCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VotingCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
