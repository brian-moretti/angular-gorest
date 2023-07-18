import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { UsersComments } from 'src/app/models/gorest.model';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;
  let newComment: UsersComments;
  let form: NgForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommentComponent],
      imports: [FormsModule, ButtonModule],
    });
    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
