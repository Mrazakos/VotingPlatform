import { OptionVotePair } from '../../models/option-vote-pair';
import { Vote } from '../../models/vote';
import { VotingType } from '../../models/voting-type';

export interface VotingCardCreate {
  title: string;
  description: string;
  type: VotingType;
  options: OptionVotePair[];
  votes: Vote[];
  createdUserId: string | null;
  activeUntil: Date;
}
