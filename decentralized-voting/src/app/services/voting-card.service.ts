import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VotingCard } from '../voting-card/model/voting-card';

@Injectable({
  providedIn: 'root',
})
export class VotingCardService {
  constructor(private firestore: Firestore) {}

  getVotingCards(): Observable<VotingCard[]> {
    const votingCardsCollection = collection(this.firestore, 'VotingCards'); // Move inside function
    return collectionData(votingCardsCollection, { idField: 'id' }) as Observable<VotingCard[]>;
  }

  getVotingCardById(id: string): Observable<VotingCard> {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return docData(votingCardDoc, { idField: 'id' }) as Observable<VotingCard>;
  }

  addVotingCard(votingCard: VotingCard) {
    const votingCardsCollection = collection(this.firestore, 'VotingCards'); // Move inside function
    return addDoc(votingCardsCollection, votingCard);
  }

  updateVotingCard(id: string, votingCard: VotingCard) {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return setDoc(votingCardDoc, votingCard);
  }

  deleteVotingCard(id: string) {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return deleteDoc(votingCardDoc);
  }
}
