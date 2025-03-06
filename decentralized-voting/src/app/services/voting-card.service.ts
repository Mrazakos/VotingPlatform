import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, setDoc, deleteDoc, docData, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { VotingCard } from '../voting-card/model/voting-card';

@Injectable({
  providedIn: 'root'
})
export class VotingCardService {
  private votingCardsCollection: CollectionReference;

  constructor(private firestore: Firestore) {
    this.votingCardsCollection = collection(this.firestore, 'VotingCards');
  }

  getVotingCards(): Observable<VotingCard[]> {
    return collectionData(this.votingCardsCollection, { idField: 'id' }) as Observable<VotingCard[]>;
  }

  getVotingCardById(id: string): Observable<VotingCard> {
    const votingCardDoc = doc(this.firestore, `VotingCards/${id}`);
    return docData(votingCardDoc, { idField: 'id' }) as Observable<VotingCard>;
  }

  addVotingCard(votingCard: VotingCard) {
    return addDoc(this.votingCardsCollection, votingCard);
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
