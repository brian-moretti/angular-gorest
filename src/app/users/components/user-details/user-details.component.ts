import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GorestService } from 'src/app/services/gorest.service';
import {
  UsersComments,
  UsersGoRest,
  UsersPosts,
} from 'src/app/models/gorest.model';
import { from } from 'rxjs';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from 'src/app/services/errors.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private gorest: GorestService,
    private location: Location,
    private handleError: ErrorsService
  ) {}

  //account: Account | undefined;
  profile: UsersGoRest = {
    name: '',
    email: '',
    gender: '',
    status: '',
  };

  posts: UsersPosts[] = [];
  comments: UsersComments[] = [];
  userRouteId = Number(this.route.snapshot.paramMap.get('id'));
  errorMessage: string = '';
  message!: Message[];

  ngOnInit(): void {
    this.getUserDetails();
  }

  //? array.some

  postComments(postID: number) {
    return this.comments.filter((comment) => comment.post_id == postID);
  }

  getUserDetails() {
    this.errorMessage = '';

    this.gorest.getUserDetails(this.userRouteId).subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });

    this.gorest.getUserPosts(this.userRouteId).subscribe({
      next: (data) => {
        this.posts = data;

        from(this.posts).subscribe(
          (post) =>
            this.gorest.getUserComments(post.id).subscribe((data) => {
              data.map((comment) => this.comments.push(comment));
            })

          /*
      ? from -> observable da array/iterabile/observable
      ? of -> observable da singoli elementi/argomenti
      * [Nel caso sopra of(this.posts) separa ciascun elemento dell'array e lo tratta come singolo array su cui applicare metodi]
      */
        );
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
  }

  addComment(postId: number, comment: UsersComments) {
    comment.post_id = postId;
    this.errorMessage = '';

    this.gorest.addUserComments(postId, comment).subscribe({
      next: (data) => {
        this.comments.splice(0, 0, data);
        /*
      ? unshift() -> meno performante con array lunghi
      ? richiamare http gorest penso sia spreco di risorse
      */
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
  }

  addUserPost(post: UsersPosts) {
    post.user_id = this.userRouteId;
    this.errorMessage = '';

    this.gorest.addUserPost(this.userRouteId, post).subscribe({
      next: (data) => {
        console.log(data);
        this.posts.splice(0, 0, data);
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          { severity: 'warn', summary: 'Warning', detail: this.errorMessage },
        ];
      },
    });
    this.hidden = !this.hidden;
  }

  hidden: boolean = true;

  showNewPostForm() {
    this.hidden = !this.hidden;
  }

  goBack() {
    this.location.back();
  }
}
