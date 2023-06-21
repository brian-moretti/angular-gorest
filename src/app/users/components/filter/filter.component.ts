import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() filterData = new EventEmitter<{ field: string; query: string }>();
  searchQuery: string = '';
  searchField: string = 'Name';

  stateOptions: any[] = [
    { label: 'Name', value: 'Name' },
    { label: 'Email', value: 'Email' },
  ];

  filter() {
    this.filterData.emit({ field: this.searchField, query: this.searchQuery });
  }
}
