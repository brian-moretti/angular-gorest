import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {

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
