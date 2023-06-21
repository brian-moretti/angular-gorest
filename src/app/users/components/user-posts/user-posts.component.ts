import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UsersComments, UsersGoRest } from 'src/app/models/usersgoRest';
import { UsersPosts } from 'src/app/models/usersgoRest';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css'],
})
export class UserPostsComponent implements OnInit {
  constructor(private gorest: GorestService) {}

  userId: Array<number> = []; //?OGGETTO CON ID + USERNAME
  users: UsersGoRest[] = [];
  posts: UsersPosts[] = [];
  filteredPost: UsersPosts[] = [];
  comments: UsersComments[] = [];

  numberOfUsers: Array<number> = [10, 20, 50, 100];
  userXPage: number = 10;

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts() {
    /* this.gorest.getUsers(this.userXPage).subscribe((data) => {
      this.users = data;
      console.log(data);
      this.userId = [...new Set(data.map((el) => el.id!))];
      //      data.map((el) => this.userId.push(el.id!));
    }); */
    this.gorest.getAllPosts(this.userXPage).subscribe((data) => {
      this.userId = [...new Set(data.map((el) => el.user_id))];
      this.posts = data;
      this.filteredPost = data;
      console.log(this.userId);
      console.log(data);
      console.log(this.posts);
      from(this.posts).subscribe((post) => {
        this.getPostsComments(post.id);
      });


    });
  }

  getPostsComments(id: number) {
    this.gorest.getUserComments(id).subscribe((data) => {
      data.map((comment) => this.comments.push(comment));
      //this.comments = [...new Set(data.map((comment) => comment))]
      //console.log(this.comments);
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

    this.gorest.addUserComments(postId, comment).subscribe((data) => {
      this.comments.splice(0, 0, data);
      /*
      ? unshift() -> meno performante con array lunghi
      ? richiamare http gorest penso sia spreco di risorse
      */
    });
  }

  addUserPost(user_id: number, post: UsersPosts) {
    post.user_id = user_id;
    this.gorest.addUserPost(user_id, post).subscribe((data) => {
      console.log(data);
      this.posts.splice(0, 0, data);
    });
  }

  removePost(post_id: number) {
    this.gorest.removePost(post_id).subscribe(() => this.getUserPosts());
  }

  removeComment(comment_id: number) {
    this.gorest
      .removeComment(comment_id)
      .subscribe(
        () =>
          (this.comments = this.comments.filter(
            (comment) => comment.id != comment_id
          ))
      );
  }

  hidden: boolean = true;

  showNewPostForm(id: number) {
    this.userId.forEach(key => {
      if(key == id){
        this.hidden = !this.hidden;
      }

    });
    //this.userId.filter(key => )
//! FARE IN MODO CHE APRA SOLO SULLO USER VOLUTO E NON SU TUTTI
  }

  usersShowedUpdate(newCount: number) {
    this.userXPage = newCount;
    this.getUserPosts();
    console.log(this.userXPage);
  }

  filterPost(filterValues: { field: string; query: string }) {
    console.log(filterValues);
    if (!filterValues.query) {
      this.posts = this.filteredPost;
      return;
    }

    const query = filterValues.query.toLowerCase().trim();
    console.log(query);

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
