import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votingActive',
})
export class VotingActivePipe implements PipeTransform {
  transform(date: Date): boolean {
    return new Date(date) > new Date();
  }
}
