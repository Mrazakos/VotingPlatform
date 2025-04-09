export enum VotingType{
  election,
  survey,
  opinion,
  poll,
  default
}

export const VotingTypeMap: Record<VotingType, string> = {
  [VotingType.election]: 'Election',
  [VotingType.survey]: 'Survey',
  [VotingType.opinion]: 'Opinion',
  [VotingType.poll]: 'Poll',
  [VotingType.default]: 'Default',
};

