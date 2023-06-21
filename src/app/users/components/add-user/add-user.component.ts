import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersGoRest } from 'src/app/models/usersgoRest';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  @Output() prova = new EventEmitter();
  @Output() newUserTest = new EventEmitter<UsersGoRest>();
  closing: boolean = true;

  constructor(private gorest: GorestService, private router: Router) {}

  newUser: UsersGoRest = { name: '', email: '', gender: '', status: '' };
  stateOptions: any[] = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];
  value: string = 'active';

  createUser(form: NgForm) {
    //TODO - METODO  SUBMIT FORM X CREARE NEW USER
    this.newUser = {
      name: form.value.username,
      email: form.value.email,
      gender: form.value.gender,
      status: form.value.status,
    };
    this.newUserTest.emit(this.newUser);
    form.reset();
    this.close()
    /*this.gorest.addNewUser(this.newUser).subscribe((data) => {
      console.log(data);
     /this.router.navigate([`/user-details/${data.id}`]);
    });
    console.log(form.value);
    console.log(this.newUser);*/
  }

  close() {
    this.prova.emit(this.closing);
    //! DA ERRORE - CHIAMA DI NUOVO ADDUSER() IN DASHBOARD SE DENTRO <FORM>
  }
}
