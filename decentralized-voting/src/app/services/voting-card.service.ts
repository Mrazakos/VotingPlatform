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
import { VotingCardCreate } from '../upsert-poll/model/voting-card-create';
import { VotingCardEdit } from '../upsert-poll/model/voting-card-edit';

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
      map(data => {
        if (!data) return null;

        const rawData = data as any;

        const activeUntil = rawData.activeUntil?.seconds
          ? new Date(rawData.activeUntil.seconds * 1000)
          : rawData.activeUntil;

        return {
          ...rawData,
          activeUntil,
        } as VotingCard;
      })
    );
  }

  addVotingCard(votingCard: VotingCardCreate) {
    const votingCardsCollection = collection(this.firestore, 'VotingCards'); // Move inside function
    return addDoc(votingCardsCollection, votingCard);
  }

  updateVotingCard(id: string, votingCard: VotingCardEdit) {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return setDoc(votingCardDoc, votingCard);
  }

  deleteVotingCard(id: string) {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return deleteDoc(votingCardDoc);
  }
}
