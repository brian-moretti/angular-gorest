import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersPosts } from 'src/app/models/usersgoRest';
import { GorestService } from 'src/app/services/gorest.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  constructor(private gorest: GorestService) {}

  @Input() post!: UsersPosts;
  @Output() formInfo = new EventEmitter();

  newPostForm!: FormGroup;

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      post: new FormGroup({
        title: new FormControl('', Validators.required),
        body: new FormControl('', [Validators.required]),
      }),
    });
  }

  form(form: FormGroup) {
    console.log(form.value);
    this.formInfo.emit({
      title: form.value.post.title,
      body: form.value.post.body,
    });
    form.reset();
    /*this.addUserPost(this.post.user_id!, {
      user_id: this.post.user_id!,
      title: form.value.post.title,
      body: form.value.post.body,
    });*/
  }

/*   addUserPost(user_id: number, post: UsersPosts) {
    this.gorest
      .addUserPost(user_id, post)
      .subscribe((data) => console.log(data));
    //! id prelevato dal select dei id post trovati dall'array
  } */
}
