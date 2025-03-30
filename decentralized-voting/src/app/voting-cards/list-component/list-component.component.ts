import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-component',
  imports: [],
  templateUrl: './list-component.component.html',
  styleUrl: './list-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponentComponent { }
