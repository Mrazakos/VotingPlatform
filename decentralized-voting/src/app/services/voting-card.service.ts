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
  query,
  where,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { VotingCard } from '../voting-card/model/voting-card';
import { VotingCardUpsert } from '../create-poll/model/voting-card-upser';

@Injectable({
  providedIn: 'root',
})
export class VotingCardService {
  constructor(private firestore: Firestore) {}

  getVotingCards(searchQuery: string = ''): Observable<VotingCard[]> {
    const collectionRef = collection(this.firestore, 'VotingCards');

    if (!searchQuery) {
      return collectionData(collectionRef, { idField: 'id' }) as Observable<VotingCard[]>;
    }

    const titleQuery = query(
      collectionRef,
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff')
    );

    return collectionData(titleQuery, { idField: 'id' }) as Observable<VotingCard[]>;
  }

  getVotingCardById(id: string): Observable<VotingCard | null> {
    const docRef = doc(this.firestore, 'VotingCards', id);
    return docData(docRef, { idField: 'id' }).pipe(
      map(data => (data ? (data as VotingCard) : null)) // Return null if no data
    );
  }

  addVotingCard(votingCard: VotingCardUpsert) {
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
