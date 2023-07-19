import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserPostsComponent } from './user-posts.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { FilterPostsComponent } from '../filter-posts/filter-posts.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { GorestService } from 'src/app/services/gorest.service';
import { UsersComments, UsersPosts } from 'src/app/models/gorest.model';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserPostsComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;
  let gorest: GorestService;
  let event: PaginatorState;
  let comment: UsersComments;
  let comments: UsersComments[];
  let posts: UsersPosts;
  let error: HttpErrorResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserPostsComponent,
        SidebarMenuComponent,
        FilterPostsComponent,
        FooterComponent,
      ],
      imports: [
        HttpClientTestingModule,
        PaginatorModule,
        MessagesModule,
        ButtonModule,
      ],
    });
    fixture = TestBed.createComponent(UserPostsComponent);
    gorest = TestBed.inject(GorestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get data from service and use it', () => {
    [posts] = [
      { title: '', body: '', id: 1, user_id: 1 },
      { title: '', body: '', id: 2, user_id: 2 },
    ];
    spyOn(gorest, 'getAllPosts').and.returnValue(of([posts]));
    component.getUserPosts();
    expect(component.posts).toEqual([posts]);
    expect(component.filteredPost).toEqual([posts]);
  });

  it('handle getUserposts errors', () => {
    error = new HttpErrorResponse({});
    spyOn(gorest, 'getAllPosts').and.returnValue(throwError(() => error));
    component.getUserPosts();
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });

  it('should change params on page change', () => {
    event = { page: 1, rows: 10, first: 10, pageCount: 0 };
    component.onPageChange(event);
    expect(component.currentPage).toBe(event.page! + 1);
    expect(component.resultPerPage).toEqual(event.rows!);
    expect(component.elementDisplayed).toEqual(event.first!);
  });

  it('add comments in the array', () => {
    let id = 1;
    comments = [
      { name: '', email: '', body: '' },
      { name: '', email: '', body: '' },
    ];
    spyOn(gorest, 'getUserComments').and.returnValue(of(comments));
    component.getPostsComments(id);
    expect(component.comments).toEqual(comments);
  });

  it('handle getPostsComments errors', () => {
    let id = 1;
    error = new HttpErrorResponse({});
    spyOn(gorest, 'getUserComments').and.returnValue(throwError(() => error));
    component.getPostsComments(id);
    expect(component.errorMessage).toBeDefined();
  });

  it('insert the new post in the array', () => {
    let user_id = 1;
    let post: UsersPosts = { id: 1, user_id: 1, title: '', body: '' };
    expect(post.id).toEqual(user_id);
    spyOn(gorest, 'addUserPost').and.returnValue(of(posts));
    let spy = spyOn(component.posts, 'splice');
    component.addUserPost(user_id, post);
    expect(component.expandedNewPostId).toBeNull();
    expect(spy).toHaveBeenCalledWith(0, 0, posts);
  });

  it('handle getPostsComments errors', () => {
    let user_id = 1;
    let post: UsersPosts = { id: 1, user_id: 1, title: '', body: '' };
    error = new HttpErrorResponse({});
    spyOn(gorest, 'addUserPost').and.returnValue(throwError(() => error));
    component.addUserPost(user_id, post);
    expect(component.errorMessage).toBeDefined();
  });

  it('collapse form to add new post', () => {
    let id = 1;
    expect(component.expandedNewPostId).toBeNull();

    component.showNewPostForm(id);
    expect(component.expandedNewPostId).toBe(id);

    component.showNewPostForm(id);
    expect(component.expandedNewPostId).toBeNull();
  });

  it('no filter when input is empty', () => {
    let filterValue = { field: '', query: '' };
    expect(component.posts).toEqual(component.filteredPost);
    component.filterPost(filterValue);
  });

  it('handle error on addComment', () => {
    error = new HttpErrorResponse({});
    let post_id = 1;
    comment = { id: 1, post_id: 1, body: '', name: '', email: '' };
    spyOn(gorest, 'addUserComments').and.returnValue(throwError(() => error));
    component.addComment(post_id, comment);
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });
});
