import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserDetailsComponent } from './user-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../footer/footer.component';
import { TabViewModule } from 'primeng/tabview';
import { AddPostComponent } from '../add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  UsersComments,
  UsersGoRest,
  UsersPosts,
} from 'src/app/models/gorest.model';
import { GorestService } from 'src/app/services/gorest.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserDetailComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let gorest: GorestService;
  let posts: UsersPosts[];
  let comments: UsersComments[];
  let account: UsersGoRest;
  let error: HttpErrorResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserDetailsComponent,
        SidebarMenuComponent,
        FooterComponent,
        AddPostComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MessagesModule,
        ButtonModule,
        TabViewModule,
        ReactiveFormsModule,
      ],
    });
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    gorest = TestBed.inject(GorestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get user informations', () => {
    spyOn(gorest, 'getUserDetails').and.returnValue(of(account));
    component.getUserDetails();
    expect(component.profile).toEqual(account);
  });

  it('handle error for getUserDetail', () => {
    error = new HttpErrorResponse({});
    spyOn(gorest, 'getUserDetails').and.returnValue(throwError(() => error));
    component.getUserDetails();
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });

  it("get user's posts informations", () => {
    posts = [];
    comments = [];
    spyOn(gorest, 'getUserPosts').and.returnValue(of(posts));
    component.getUserDetails();
    expect(component.posts).toEqual(posts);
  });

  it('handle error for getUserPosts', () => {
    error = new HttpErrorResponse({});
    spyOn(gorest, 'getUserPosts').and.returnValue(throwError(() => error));
    component.getUserDetails();
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });

  it('should convert hideMenu boolean property', () => {
    expect(component.hidden).toBeTruthy();
    component.showNewPostForm();
    expect(component.hidden).toBeFalsy();
    component.showNewPostForm();
    expect(component.hidden).toBeTruthy();
  });
});
