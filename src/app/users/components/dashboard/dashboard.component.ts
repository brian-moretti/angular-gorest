import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersGoRest } from 'src/app/models/usersgoRest';
import { GorestService } from 'src/app/services/gorest.service';

//? DA SPOSTARE

//! SISTEMARE FATTO CHE QUANDO DA DASHBOARD VADO SU DETTAGLI O ALTRO PREMENDO "BACK" NON RITORNA MA SERVE 2 VOLTE
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private gorest: GorestService, private router: Router) {}

  users: UsersGoRest[] = [];
  filteredData: Array<UsersGoRest> = [];
  test: Subscription = new Subscription();
  test2: boolean = true; //! PULSANTE DI AGGIUNTA NUOVO UTENTE

  numberOfUsers: Array<number> = [10, 20, 50, 100];
  userXPage: number = 10;

  ngOnInit(): void {
    this.getUsers();

    /*     this.test = this.gorest.getUsers().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.filteredData = data;
      console.log(this.users);
    });
 */
    //this.createUser();
    //! Creare interfaccia per ciascun oggetto ricevuto da chiamata http
  }

  getUsers() {
    this.gorest.getUsers(this.userXPage).subscribe((data) => {
      this.users = data;
      this.filteredData = data;
    });
  }

  addUser(newUser: UsersGoRest) {
    this.gorest.addNewUser(newUser).subscribe((data) => {
      console.log(data);
      this.getUsers();
    });
  }

  removeUser(id: number) {
    this.gorest.removeUser(id).subscribe(() =>
      //this.users = this.users.filter((user) => user.id !== id)
      this.getUsers()
    );
    console.log(id);
  }

  filterUsers(filterValues: { field: string; query: string }) {
    if (!filterValues.query) {
      this.users = this.filteredData;
      return;
    }

    const query = filterValues.query.toLowerCase().trim();

    this.users = this.filteredData.filter((key) => {
      return filterValues.field == 'Email'
        ? key.email.toLowerCase().trim().includes(query)
        : key.name.toLowerCase().trim().includes(query);

      // TODO - Check key[filtervalues.field] errore type string in interface
    });
  }

  onClickAddUser() {
    this.test2 = !this.test2;
  }

  usersShowedUpdate(newCount: number) {
    this.userXPage = newCount;
    this.getUsers();
    console.log(this.userXPage);
  }
}
