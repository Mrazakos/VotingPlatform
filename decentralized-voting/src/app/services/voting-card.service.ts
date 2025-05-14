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
import { VotingCardUpsert } from '../upsert-poll/model/voting-card-upsert';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class VotingCardService {
  constructor(private firestore: Firestore) {}

  getVotingCards(searchQuery: string = ''): Observable<VotingCard[]> {
    const collectionRef = collection(this.firestore, 'VotingCards');

    if (!searchQuery) {
      const descendingActive = query(collectionRef, orderBy('activeUntil', 'desc'));
      return collectionData(descendingActive, { idField: 'id' }).pipe(
        map((cards: any[]) =>
          cards.map(card => ({
            ...card,
            activeUntil: card.activeUntil?.seconds
              ? new Date(card.activeUntil.seconds * 1000)
              : card.activeUntil,
          }))
        )
      ) as Observable<VotingCard[]>;
    }

    const titleQuery = query(
      collectionRef,
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff'),
      orderBy('activeUntil', 'desc')
    );

    return collectionData(titleQuery, { idField: 'id' }).pipe(
      map((cards: any[]) =>
        cards.map(card => ({
          ...card,
          activeUntil: card.activeUntil?.seconds
            ? new Date(card.activeUntil.seconds * 1000)
            : card.activeUntil,
        }))
      )
    ) as Observable<VotingCard[]>;
  }

  getActiveVotingCards(searchQuery: string = ''): Observable<VotingCard[]> {
    const collectionRef = collection(this.firestore, 'VotingCards');

    if (!searchQuery) {
      const ascendingActive = query(
        collectionRef,
        where('activeUntil', '>=', new Date()),
        orderBy('activeUntil', 'asc')
      );
      return collectionData(ascendingActive, { idField: 'id' }).pipe(
        map((cards: any[]) =>
          cards.map(card => ({
            ...card,
            activeUntil: card.activeUntil?.seconds
              ? new Date(card.activeUntil.seconds * 1000)
              : card.activeUntil,
          }))
        )
      ) as Observable<VotingCard[]>;
    }

    const titleQuery = query(
      collectionRef,
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff'),
      where('activeUntil', '>=', new Date()),
      orderBy('activeUntil', 'asc')
    );

    return collectionData(titleQuery, { idField: 'id' }).pipe(
      map((cards: any[]) =>
        cards.map(card => ({
          ...card,
          activeUntil: card.activeUntil?.seconds
            ? new Date(card.activeUntil.seconds * 1000)
            : card.activeUntil,
        }))
      )
    ) as Observable<VotingCard[]>;
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

  addVotingCard(votingCard: VotingCardUpsert) {
    const votingCardsCollection = collection(this.firestore, 'VotingCards'); // Move inside function
    return addDoc(votingCardsCollection, votingCard);
  }

  updateVotingCard(id: string, votingCard: VotingCardUpsert) {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return setDoc(votingCardDoc, votingCard);
  }

  deleteVotingCard(id: string) {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return deleteDoc(votingCardDoc);
  }
}
