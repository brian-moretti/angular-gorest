import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UsersComments, UsersGoRest, UsersPosts } from '../models/gorest.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root',
})
export class GorestService {
  constructor(private http: HttpClient, private handleError: ErrorsService) {}

  //* GoRest API

  gorestAPI =
    '60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a';
  gorestUsers = 'https://gorest.co.in/public/v2/users';
  gorestPosts = 'https://gorest.co.in/public/v2/posts';
  gorestComments = 'https://gorest.co.in/public/v2/comments';
  gorestTodos = 'https://gorest.co.in/public/v2/todos';

  tokenApi =
    '?access-token=60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a';

  headers = new HttpHeaders({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:
      'Bearer 60cd1406d0defd3901e0e70b768eb54ab3e27f4ac1eb1fba2eae261857797c7a',
  });

  //* GoRest Users

  getUsers(
    currentPage?: number,
    resultPerPage?: number
  ): Observable<UsersGoRest[]> {
    //? TEST
    /*
    const header = new HttpHeaders({
      'X-Pagination-Total': 2725, //max result
      'X-Pagination-Pages': 273, //max page
      'X-Pagination-Page': currentPage!, // pag corrente
      'X-Pagination-Limit': resultPerPage!, //risultati x page
    });
    */
    return this.http
      .get<UsersGoRest[]>(
        this.gorestUsers +
          this.tokenApi +
          `${currentPage ? '&page=' + currentPage : ''}` +
          `${resultPerPage ? '&per_page=' + resultPerPage : ''}`
        //{ headers: header }
      )
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  addNewUser(body: {}): Observable<UsersGoRest> {
    return this.http
      .post<UsersGoRest>(this.gorestUsers + this.tokenApi, body, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  removeUser(id: number) {
    return this.http
      .delete(`${this.gorestUsers}/${id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  getUserDetails(id: number): Observable<UsersGoRest> {
    return this.http
      .get<UsersGoRest>(`${this.gorestUsers}/${id}${this.tokenApi}`)
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  //* GoRest Posts

  getAllPosts(
    currentPage?: number,
    resultPerPage?: number
  ): Observable<UsersPosts[]> {
    return this.http
      .get<UsersPosts[]>(
        this.gorestPosts +
          this.tokenApi +
          `${currentPage ? '&page=' + currentPage : ''}` +
          `${resultPerPage ? '&per_page=' + resultPerPage : ''}`
      )
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  getUserPosts(id: number): Observable<UsersPosts[]> {
    return this.http
      .get<UsersPosts[]>(`${this.gorestUsers}/${id}/posts${this.tokenApi}`)
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  addUserPost(user_id: number, post: UsersPosts): Observable<UsersPosts> {
    return this.http
      .post<UsersPosts>(
        `${this.gorestUsers}/${user_id}/posts${this.tokenApi}`,
        post,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  removePost(post_id: number) {
    return this.http
      .delete(`${this.gorestPosts}/${post_id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  //* GoRest Comment

  getUserComments(post_id: number): Observable<UsersComments[]> {
    return this.http
      .get<UsersComments[]>(
        `${this.gorestPosts}/${post_id}/comments${this.tokenApi}`
      )
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  addUserComments(
    post_id: number,
    comment: UsersComments
  ): Observable<UsersComments> {
    return this.http
      .post<UsersComments>(
        `${this.gorestPosts}/${post_id}/comments${this.tokenApi}`,
        comment,
        { headers: this.headers }
      )
      .pipe(catchError(this.handleError.handleHttpErrors));
  }

  removeComment(comment_id: number) {
    return this.http
      .delete(`${this.gorestComments}/${comment_id}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError.handleHttpErrors));
  }
}
