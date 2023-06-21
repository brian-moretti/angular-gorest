export class AddCommentComponent {
  @Input()
 profile!: Profile;

 @Input() postId!: number;

 @Output() comment = new EventEmitter<UsersComments>();

 /*
   newComment: UsersComments = {
   post_id: this.postId,
   name: '',
   email: '',
   body: '',
 };*/



    newComment: UsersComments = {
   post_id: this.postId,
   name: '',
   email: '',
   body: '',
 };

 form(form: NgForm) {
   this.newComment.name = form.value.username;
   this.newComment.email = form.value.email;
   this.newComment.body = form.value.body;
   this.comment.emit(this.newComment);
   console.log(form.value);
   console.log(this.newComment);

   console.log(this.postId);

   //form.reset();
 }

 /*@Input()
 postId!: number;

 @Output() comment = new EventEmitter<UsersComments>();

 newComment: UsersComments = {
   post_id: this.postId,
   name: '',
   email: '',
   body: '',
 };

 form(form: NgForm) {
   console.log(form.value);
   console.log(this.newComment);
   console.log(this.postId);
   this.comment.emit(this.newComment);
 }*/
}


////////////////////////////////////

addComment(userId: number, postId: number, comment: UsersComments) {
  comment.post_id = postId;
  comment.id = userId
  console.log(comment, userId, postId);
  this.gorest.addUserComments(userId, comment).subscribe((data) => {
    this.comments.push(data);
    console.log(this.comments);
    //! FIX - NON SALVA NUOVO COMMENTO
    console.log(data);
  });
}

//////////////////////////////////////

<app-add-comment [postId]="post.id"
(comment)="addComment(post.id!, post.user_id!, $event)"></app-add-comment>
<!--      <app-add-comment [postId]="post"
(comment)="addComment(post.user_id, post.id, $event)"
></app-add-comment> -->