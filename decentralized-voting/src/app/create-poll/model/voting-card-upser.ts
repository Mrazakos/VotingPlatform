import { OptionVotePair } from '../../models/option-vote-pair';
import { Vote } from '../../models/vote';
import { VotingType } from '../../models/voting-type';

export interface VotingCardUpsert {
  title: string;
  description: string;
  type: VotingType;
  imageSrc: string;
  options: OptionVotePair[];
  votes: Vote[];
}
