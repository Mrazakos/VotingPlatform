import { OptionVotePair } from "../../models/option-vote-pair";
import { VotingType } from "../../models/voting-type";

export interface VotingCard{
  votingCardId: number
  title: string;
  description: string;
  type: VotingType;
  options: OptionVotePair[];
}