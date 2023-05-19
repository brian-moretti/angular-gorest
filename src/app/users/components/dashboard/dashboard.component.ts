import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersGoRest } from 'src/app/usersgoRest';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private firebase: FirebaseService) {}

  apiUrl =
    'https://gorest.co.in/public/v2/users?access-token=60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a&per_page=10&page=5';

  tokenApi =
    'access-token=60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a';
  dataXPage = 'per_page=100';
  nPage = 'page=5';

  users: Array<UsersGoRest> | undefined;


  ngOnInit(): void {
    this.http.get<UsersGoRest[]>(this.apiUrl).subscribe((data) => {
      console.log(data);
      this.users = data;
      console.log(this.users);
    });


    this.http.get("https://gorest.co.in/public/v2/posts?"+this.tokenApi).subscribe(data => console.log(data))
    this.http.get("https://gorest.co.in/public/v2/comments?"+this.tokenApi).subscribe(data => console.log(data))
    this.http.get("https://gorest.co.in/public/v2/todos?"+this.tokenApi).subscribe(data => console.log(data))
    //! Creare interfaccia per ciascun oggetto ricevuto da chiamata http
    //TODO SPOSTARE LE CHIAMATE IN UN SERVIZIO SPECIFICO E QUI SOLO LA CHIAMATA AL SERVIZIO
  }
}
