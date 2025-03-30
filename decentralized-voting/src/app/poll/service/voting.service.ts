import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { getDoc, increment } from 'firebase/firestore';

import { from, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { OptionVotePair } from '../../models/option-vote-pair';
import { Vote } from '../../models/vote';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async vote(votingCardId: string, selectedOption: string): Promise<void> {
    const userId = await this.authService.getUserId();
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const cardRef = doc(this.firestore, `VotingCards/${votingCardId}`);

    const cardDoc = await getDoc(cardRef);
    if (!cardDoc.exists()) {
      throw new Error('Voting card not found');
    }

    const data = cardDoc.data();
    const options = data?.['options'] || [];
    const votes = (data?.['votes'] || []) as Vote[];

    const selectedOptionIndex = options.findIndex(
      (option: OptionVotePair) => option.option === selectedOption
    );

    if (selectedOptionIndex === -1) {
      throw new Error('Option not found');
    }
    let currentVotes = options[selectedOptionIndex].votes;
    currentVotes = typeof currentVotes === 'number' ? currentVotes : parseInt(currentVotes, 10);

    options[selectedOptionIndex].votes = currentVotes + 1;
    votes.push({ userId: userId, option: selectedOption });
    await updateDoc(cardRef, {
      options: options,
      votes: votes,
    });

    console.log('Vote successfully updated');
  }
}
