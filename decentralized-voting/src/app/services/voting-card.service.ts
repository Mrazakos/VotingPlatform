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
  query,
  where,
  QueryConstraint,
  limit,
} from '@angular/fire/firestore';
import { map, Observable, from } from 'rxjs';
import { VotingCard } from '../voting-card/model/voting-card';
import { VotingCardUpsert } from '../upsert-poll/model/voting-card-upsert';
import { orderBy } from 'firebase/firestore';
import { AuthService } from '../auth/services/auth.service';
import { switchMap } from 'rxjs/operators';

export interface VotingCardFilter {
  searchQuery?: string;
  onlyActive?: boolean;
  onlyOwn?: boolean;
  top?: number;
  order?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class VotingCardService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  getVotingCards(filter: VotingCardFilter = {}): Observable<VotingCard[]> {
    if (filter.onlyOwn) {
      return from(this.authService.getUserId()).pipe(
        switchMap(userId => {
          const collectionRef = collection(this.firestore, 'VotingCards');
          const constraints: QueryConstraint[] = [];

          // Only cards created by a specific user
          if (userId) {
            constraints.push(where('createdUserId', '==', userId));
          }

          // Search by title
          if (filter.searchQuery) {
            constraints.push(
              where('title', '>=', filter.searchQuery),
              where('title', '<=', filter.searchQuery + '\uf8ff')
            );
          }

          // Only active cards
          if (filter.onlyActive) {
            constraints.push(where('activeUntil', '>=', new Date()));
          }

          // Order by activeUntil
          constraints.push(orderBy('activeUntil', filter.order || 'desc'));

          // Limit results if top is set
          if (filter.top && filter.top > 0) {
            constraints.push(limit(filter.top));
          }

          const q = query(collectionRef, ...constraints);

          return collectionData(q, { idField: 'id' }).pipe(
            map((cards: any[]) =>
              cards.map(card => ({
                ...card,
                activeUntil: card.activeUntil?.seconds
                  ? new Date(card.activeUntil.seconds * 1000)
                  : card.activeUntil,
              }))
            )
          ) as Observable<VotingCard[]>;
        })
      );
    } else {
      // No need to wait for userId
      const collectionRef = collection(this.firestore, 'VotingCards');
      const constraints: QueryConstraint[] = [];

      // Search by title
      if (filter.searchQuery) {
        constraints.push(
          where('title', '>=', filter.searchQuery),
          where('title', '<=', filter.searchQuery + '\uf8ff')
        );
      }

      // Only active cards
      if (filter.onlyActive) {
        constraints.push(where('activeUntil', '>=', new Date()));
      }

      // Order by activeUntil
      constraints.push(orderBy('activeUntil', filter.order || 'desc'));

      // Limit results if top is set
      if (filter.top && filter.top > 0) {
        constraints.push(limit(filter.top));
      }

      const q = query(collectionRef, ...constraints);

      return collectionData(q, { idField: 'id' }).pipe(
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
