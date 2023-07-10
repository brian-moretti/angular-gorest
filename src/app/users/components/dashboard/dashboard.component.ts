import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UsersGoRest } from 'src/app/models/gorest.model';
import { ErrorsService } from 'src/app/services/errors.service';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private gorest: GorestService,
    private handleError: ErrorsService
  ) {}

  //? PER FARE UNSUBSCRIBE
  test: Subscription = new Subscription();

  users: UsersGoRest[] = [];
  filteredData: Array<UsersGoRest> = [];
  addNewUser: boolean = true;

  errorMessage: string = '';
  message!: Message[];

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.gorest.getUsers(this.currentPage, this.resultPerPage).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredData = data;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
  }

  elementDisplayed: number = 0;
  //first sarebbe il numero complessivo di elementi
  currentPage: number = 0;
  resultPerPage: number = 10;
  onPageChange(event: any) {
    this.currentPage = event.page + 1;
    this.resultPerPage = event.rows;
    this.elementDisplayed = event.first;
    console.log(event);
    console.log(this.currentPage);
    console.log(this.resultPerPage);

    this.getUsers();
  }

  addUser(newUser: UsersGoRest) {
    this.gorest.addNewUser(newUser).subscribe({
      next: (data) => {
        console.log(data);
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
  }

  removeUser(id: number) {
    this.gorest.removeUser(id).subscribe({
      next: () =>
        //this.users = this.users.filter((user) => user.id !== id)
        this.getUsers(),
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
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
    this.addNewUser = !this.addNewUser;
  }
}
