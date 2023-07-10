import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersComments, UsersGoRest } from 'src/app/models/gorest.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent {
  @Input()
  profile!: UsersGoRest;

  @Output() comment = new EventEmitter<UsersComments>();

  newComment: UsersComments = {
    name: '',
    email: '',
    body: '',
  };

  form(form: NgForm) {
    this.newComment = {
      name: form.value.name,
      email: form.value.email,
      body: form.value.body,
    };
    this.comment.emit(this.newComment);
    console.log(form.value);
    form.reset();
  }
}
