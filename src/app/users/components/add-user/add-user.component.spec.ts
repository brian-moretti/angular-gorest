import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let form: NgForm

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserComponent],
      imports: [FormsModule, ButtonModule, SelectButtonModule],
    });
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change showError to true', () => {
    component.onFieldChange()
    expect(component.showError).toBeTruthy()

  })
});
