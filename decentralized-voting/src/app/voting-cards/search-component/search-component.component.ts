import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-search-component',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() searchChanged = new EventEmitter<string>();
  searchQuery: string = '';
  @Output() onlyActive: EventEmitter<boolean> = new EventEmitter<boolean>();

  onlyActiveChecked: boolean = false;
  onSearchChange() {
    this.searchChanged.emit(this.searchQuery);
  }
  onCheckboxChange() {
    this.onlyActive.emit(this.onlyActiveChecked);
  }
}
