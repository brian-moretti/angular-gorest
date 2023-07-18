import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GorestService } from './gorest.service';
import { UsersComments, UsersGoRest, UsersPosts } from '../models/gorest.model';

describe('GorestService', () => {
  let service: GorestService;
  let controller: HttpTestingController;
  let comment: UsersComments;
  let post: UsersPosts;
  let user: UsersGoRest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GorestService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('call the api to add new user', () => {
    user = { name: '', email: '', gender: '', status: '' };
    service.addNewUser(user).subscribe((response) => {
      expect(response).toEqual(user);
    });
    const mockReq = controller.expectOne(
      service.gorestUsers + service.tokenApi
    );
    expect(mockReq.request.method).toEqual('POST');
  });

  it('call the api to remove post', () => {
    let id = 0;
    const mockResponse = { success: true };
    service.removeUser(id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const mockReq = controller.expectOne(`${service.gorestUsers}/${id}`);
    expect(mockReq.request.method).toEqual('DELETE');
  });

  it('call the api to add new post', () => {
    let user_id = 0;
    post = { id: 0, user_id: user_id, title: '', body: '' };
    service.addUserPost(user_id, post).subscribe((response) => {
      expect(response).toEqual(post);
    });
    const mockReq = controller.expectOne(
      `${service.gorestUsers}/${user_id}/posts${service.tokenApi}`
    );
    expect(mockReq.request.method).toEqual('POST');
  });

  it('call the api to remove post', () => {
    let post_id = 0;
    const mockResponse = { success: true };
    service.removePost(post_id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const mockReq = controller.expectOne(`${service.gorestPosts}/${post_id}`);
    expect(mockReq.request.method).toEqual('DELETE');
  });

  it('call the api method to get user comments', () => {
    let post_id = 0;
    service.getUserComments(post_id).subscribe((response) => {
      expect(response).toEqual([comment]);
    });
    const mockReq = controller.expectOne(
      `${service.gorestPosts}/${post_id}/comments${service.tokenApi}`
    );
    expect(mockReq.request.method).toEqual('GET');
  });

  it('call the api to add new comment', () => {
    let post_id = 0;
    comment = { name: '', email: '', body: '' };
    service.addUserComments(post_id, comment).subscribe((response) => {
      expect(response).toEqual(comment);
    });
    const mockReq = controller.expectOne(
      `${service.gorestPosts}/${post_id}/comments${service.tokenApi}`
    );
    expect(mockReq.request.method).toEqual('POST');
  });

  it('call the api to remove comment', () => {
    let comment_id = 0;
    const mockResponse = { success: true };
    service.removeComment(comment_id).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const mockReq = controller.expectOne(
      `${service.gorestComments}/${comment_id}`
    );
    expect(mockReq.request.method).toEqual('DELETE');
  });
});
