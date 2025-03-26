import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-poll',
  imports: [],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollComponent { }
