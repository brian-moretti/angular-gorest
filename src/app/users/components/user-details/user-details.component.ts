import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GorestService } from 'src/app/services/gorest.service';
import {
  Profile,
  UsersComments,
  UsersPosts,
  UsersTodos,
} from 'src/app/models/usersgoRest';
import { from } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private gorest: GorestService) {}

  //account: Account | undefined;
  profile: Profile = {
    name: '',
    email: '',
    gender: '',
    status: '',
  };

  posts: UsersPosts[] = [];
  comments: UsersComments[] = [];
  todos: UsersTodos[] = [];
  userRouteId = Number(this.route.snapshot.paramMap.get('id'));

  ngOnInit(): void {
    this.getUserDetails();
  }

  /*
  ? array.some
  */

  postComments(postID: number) {
    return this.comments.filter((comment) => comment.post_id == postID);
  }

  getUserDetails() {
    this.gorest.getUserDetails(this.userRouteId).subscribe((data) => {
      this.profile = data;
    });

    this.gorest.getUserPosts(this.userRouteId).subscribe((data) => {
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
    });

    this.gorest.getUserTodos(this.userRouteId).subscribe((data) => {
      this.todos = data;
    });
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

  addUserPost(post: UsersPosts) {
    post.user_id = this.userRouteId;
    this.gorest.addUserPost(this.userRouteId, post).subscribe((data) => {
      console.log(data);
      this.posts.splice(0, 0, data);
    });
  }

  hidden: boolean = true;

  showNewPostForm() {
    this.hidden = !this.hidden;
  }
}
