import { Pipe, type PipeTransform } from '@angular/core';
import { VotingType } from '../models/voting-type';

const VotingTypeImageSrcMap: Record<VotingType, string> = {
  [VotingType.election]: 'election.png',
  [VotingType.survey]: 'survey.png',
  [VotingType.opinion]: 'opinion.png',
  [VotingType.poll]: 'poll.jpg',
  [VotingType.default]: 'default.jpg',
};

@Pipe({
  name: 'votingTypeImage',
})
export class VotingTypeImagePipe implements PipeTransform {
  transform(type: VotingType): string {
    return VotingTypeImageSrcMap[type] || 'default.png';
  }
}
