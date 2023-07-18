import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { PaginatorState } from 'primeng/paginator';
import { from } from 'rxjs';
import { UsersComments, UsersPosts } from 'src/app/models/gorest.model';
import { ErrorsService } from 'src/app/services/errors.service';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
  constructor(
    private gorest: GorestService,
    private handleError: ErrorsService
  ) {}

  userInfo: number[] = [];
  posts: UsersPosts[] = [];
  filteredPost: UsersPosts[] = [];
  comments: UsersComments[] = [];
  errorMessage: string = '';
  message!: Message[];

  ngOnInit(): void {
    this.getUserPosts();
  }

  elementDisplayed: number = 0;
  //first sarebbe il numero complessivo di elementi
  currentPage: number = 0;
  resultPerPage: number = 10;
  totalPerPage = this.resultPerPage;
  onPageChange(event: PaginatorState) {
    this.currentPage = event.page! + 1;
    this.resultPerPage = event.rows!;
    this.elementDisplayed = event.first!;
    this.getUserPosts();
  }

  getUserPosts() {
    this.gorest.getAllPosts(this.currentPage, this.resultPerPage).subscribe({
      next: (data) => {
        this.userInfo = [];
        data.map((element) => {
          this.userInfo.push(element.user_id);
          this.userInfo = Array.from(new Set(this.userInfo))
        });
        this.posts = data;
        this.filteredPost = data;
        from(this.posts).subscribe((post) => {
          this.comments = [];
          this.getPostsComments(post.id);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
        this.message = [
          {
            severity: 'warn',
            summary: 'Warning',
            detail: this.errorMessage,
          },
        ];
      },
    });
  }

  getPostsComments(id: number) {
    this.gorest.getUserComments(id).subscribe({
      next: (data) => {
        data.map((comment) => {
          this.comments.push(comment);
        });
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
      },
    });
  }

  postComments(postID: number) {
    return this.comments.filter((comment) => comment.post_id == postID);
  }

  userPosts(userID: number) {
    return this.posts.filter((post) => post.user_id == userID);
  }

  addComment(postId: number, comment: UsersComments) {
    comment.post_id = postId;

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
      },
    });
  }

  addUserPost(user_id: number, post: UsersPosts) {
    post.user_id = user_id;
    this.gorest.addUserPost(user_id, post).subscribe({
      next: (data) => {
        console.log(data);
        this.posts.splice(0, 0, data);
        this.expandedNewPostId = null;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
      },
    });
  }

  removePost(post_id: number) {
    this.gorest.removePost(post_id).subscribe({
      next: () =>
        (this.posts = this.posts.filter((post) => post.id != post_id)),
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
      },
    });
  }

  removeComment(comment_id: number) {
    this.gorest.removeComment(comment_id).subscribe({
      next: () =>
        (this.comments = this.comments.filter(
          (comment) => comment.id != comment_id
        )),
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.handleError.handleGoRestErrors(error);
      },
    });
  }

  expandedNewPostId: number | null = null;

  showNewPostForm(id: number) {
    if (this.expandedNewPostId === id) {
      this.expandedNewPostId = null;
    } else {
      this.expandedNewPostId = id;
    }
    //? Inversione === con !== e null/id ha lo stesso effetto
  }

  filterPost(filterValues: { field: string; query: string }) {
    if (!filterValues.query) {
      this.posts = this.filteredPost;
      return;
    }

    const query = filterValues.query.toLowerCase().trim();

    this.posts = this.filteredPost.filter((key) => {
      switch (filterValues.field) {
        case 'ID':
          return key.id.toString().includes(query);
        case 'User ID':
          return key.user_id.toString().includes(query);
        case "Post's Title":
          return key.title.toLowerCase().trim().includes(query);
        case "Post's Body":
          return key.body.toLowerCase().trim().includes(query);
        default:
          return;
      }
    });
  }
}
