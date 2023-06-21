import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Profile,
  UsersComments,
  UsersGoRest,
  UsersPosts,
  UsersTodos,
} from '../models/usersgoRest';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GorestService {
  constructor(private http: HttpClient) {}

  //! GoRest API

  gorestAPI = '60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7';
  gorestUsers = 'https://gorest.co.in/public/v2/users';
  gorestPosts = 'https://gorest.co.in/public/v2/posts';
  gorestComments = 'https://gorest.co.in/public/v2/comments';
  gorestTodos = 'https://gorest.co.in/public/v2/todos';

  tokenApi =
    '?access-token=60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a';
  dataXPage = '&per_page=100'; //TODO - RENDERE DINAMICO LE PAGE
  nPage = '&page=5'; // TODO RENDERE DINAMICO IL N. PAGE

  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer 60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a',
  });

  //! Da cancellare
  apiUrl =
    'https://gorest.co.in/public/v2/users?access-token=60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a&per_page=10&page=5';

  profile: Profile = { name: '', email: '', gender: '', status: '' };

  createUser() {
    /*
      ? header = gorest -H
      ? body = name: user/email/gender/status
      ? return this.http.post(urlGorest, header, body)
      ! creazione classe con queste proprietà
      ! Api key goRest in localstorage utente creato
      */
  }

  users: Array<UsersGoRest> = [];

  getUsers(dataXPage?: number): Observable<UsersGoRest[]> {
    return this.http.get<UsersGoRest[]>(
      this.gorestUsers +
        this.tokenApi +
        `${dataXPage ? '&per_page=' + dataXPage : ''}`
    );
  }

  addNewUser(body: {}): Observable<UsersGoRest> {
    return this.http.post<UsersGoRest>(this.gorestUsers + this.tokenApi, body, {
      headers: this.headers,
    });
  }

  removeUser(id: number) {
    return this.http.delete(`${this.gorestUsers}/${id}`, {
      headers: this.headers,
    });
  }

  getUserDetails(id: number): Observable<UsersGoRest> {
    return this.http.get<UsersGoRest>(
      `${this.gorestUsers}/${id}${this.tokenApi}`
    );
  }

  getUserPosts(id: number): Observable<UsersPosts[]> {
    return this.http.get<UsersPosts[]>(
      `${this.gorestUsers}/${id}/posts${this.tokenApi}`
    );
  }

  addUserPost(user_id: number, post: UsersPosts): Observable<UsersPosts> {
    return this.http.post<UsersPosts>(
      `${this.gorestUsers}/${user_id}/posts${this.tokenApi}`,
      post,
      { headers: this.headers }
    );
  }

  //! TESTARE REMOVE POST/COMMENT/TODO
  removePost(post_id: number) {
    return this.http.delete(`${this.gorestPosts}/${post_id}`, {
      headers: this.headers,
    });
  }

  getAllPosts(dataXPage?: number): Observable<UsersPosts[]> {
    return this.http.get<UsersPosts[]>(
      this.gorestPosts +
        this.tokenApi +
        `${dataXPage ? '&per_page=' + dataXPage : ''}`
    );
  }

  getUserComments(post_id: number): Observable<UsersComments[]> {
    return this.http.get<UsersComments[]>(
      `${this.gorestPosts}/${post_id}/comments${this.tokenApi}`
    );
  }

  addUserComments(
    post_id: number,
    comment: UsersComments
  ): Observable<UsersComments> {
    return this.http.post<UsersComments>(
      `${this.gorestPosts}/${post_id}/comments${this.tokenApi}`,
      comment,
      { headers: this.headers }
    );
  }

  removeComment(comment_id: number){
    return this.http.delete(`${this.gorestComments}/${comment_id}`, {
      headers: this.headers,
    });
  }

  getUserTodos(id: number): Observable<UsersTodos[]> {
    return this.http.get<UsersTodos[]>(
      `${this.gorestUsers}/${id}/todos${this.tokenApi}`
    );
  }
}
