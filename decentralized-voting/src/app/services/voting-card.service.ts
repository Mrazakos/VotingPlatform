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
  getDoc,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
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

  getVotingCardById(id: string): Observable<VotingCard | null> {
    const docRef = doc(this.firestore, 'VotingCards', id);
    return docData(docRef, { idField: 'id' }).pipe(
      map(data => (data ? (data as VotingCard) : null)) // Return null if no data
    );
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
