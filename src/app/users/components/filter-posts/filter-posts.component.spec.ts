import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownModule } from 'primeng/dropdown';
import { FilterPostsComponent } from './filter-posts.component';
import { FormsModule } from '@angular/forms';

describe('FilterPostsComponent', () => {
  let component: FilterPostsComponent;
  let fixture: ComponentFixture<FilterPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPostsComponent],
      imports: [DropdownModule, FormsModule],
    });
    fixture = TestBed.createComponent(FilterPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if filter method emit correctly the data received', () => {
    spyOn(component.filterData, 'emit');
    component.filter();
    expect(component.filterData.emit).toHaveBeenCalledWith({
      field: component.searchField,
      query: component.searchQuery,
    });
  });
});
