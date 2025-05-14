import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, orderBy, query, where } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { Comment } from '../model/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private firestore: Firestore) {}

  getComments(pollId: string): Observable<Comment[]> {
    const collectionRef = collection(this.firestore, 'Comments');
    const commentsQuery = query(
      collectionRef,
      where('votingCardId', '==', pollId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(commentsQuery, { idField: 'id' }).pipe(
      map((comments: any[]) =>
        comments.map(comment => ({
          ...comment,
          createdAt: comment.createdAt?.seconds
            ? new Date(comment.createdAt.seconds * 1000)
            : comment.createdAt,
        }))
      )
    ) as Observable<Comment[]>;
  }
  addComment(comment: Comment): void {
    const collectionRef = collection(this.firestore, 'Comments');
    addDoc(collectionRef, comment);
  }
}
