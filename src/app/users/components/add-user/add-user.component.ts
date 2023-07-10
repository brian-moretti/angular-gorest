import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersGoRest } from 'src/app/models/gorest.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  @Output() closeForm = new EventEmitter();
  @Output() newUserTest = new EventEmitter<UsersGoRest>();
  closing: boolean = true;

  newUser: UsersGoRest = { name: '', email: '', gender: '', status: '' };
  stateOptions: any[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  value: string = 'active';

  showError: boolean = false;

  createUser(form: NgForm) {
    this.newUser = {
      name: form.value.username,
      email: form.value.email,
      gender: form.value.gender,
      status: form.value.status,
    };
    this.newUserTest.emit(this.newUser);
    form.reset();
    this.close(form);
  }

  close(form: NgForm) {
    form.reset();
    this.closeForm.emit(this.closing);
  }

  onFieldChange() {
    this.showError = true;
  }
}
