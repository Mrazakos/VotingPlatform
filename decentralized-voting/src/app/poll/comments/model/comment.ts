export interface Comment {
  id?: string;
  content: string;
  createdAt: Date;
  createdUserId: string;
  createdUserEmail: string;
  votingCardId: string;
}
