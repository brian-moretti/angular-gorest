import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHeaderComponent } from './dashboard-header.component';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardHeaderComponent],
      imports: [FormsModule, SelectButtonModule],
    });
    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the filter method emit correctly the data received ', () => {
    spyOn(component.filterData, 'emit');
    component.filter();
    expect(component.filterData.emit).toHaveBeenCalledWith({
      field: component.searchField,
      query: component.searchQuery,
    });
  });
});
