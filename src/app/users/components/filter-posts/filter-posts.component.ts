import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-posts',
  templateUrl: './filter-posts.component.html',
  styleUrls: ['./filter-posts.component.css'],
})
export class FilterPostsComponent {
  @Output() filterData = new EventEmitter<{ field: string; query: string }>();
  searchField: string = '';
  searchQuery: string = '';
  field = [
    { option: 'ID', value: 'ID' },
    { option: 'User ID', value: 'User ID' },
    { option: "Post's Title", value: "Post's Title" },
    { option: "Post's Body", value: "Post's Body" },
  ];

  filter() {
    this.filterData.emit({ field: this.searchField, query: this.searchQuery });
  }
}
