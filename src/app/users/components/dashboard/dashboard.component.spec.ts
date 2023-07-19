import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { AddUserComponent } from '../add-user/add-user.component';
import { MessagesModule } from 'primeng/messages';
import { FooterComponent } from '../footer/footer.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GorestService } from 'src/app/services/gorest.service';
import { of, throwError } from 'rxjs';
import { UsersGoRest } from 'src/app/models/gorest.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let gorest: GorestService;
  let users: UsersGoRest[];
  let user: UsersGoRest;
  let error: HttpErrorResponse;
  let event: PaginatorState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        SidebarMenuComponent,
        DashboardHeaderComponent,
        AddUserComponent,
        FooterComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ButtonModule,
        PaginatorModule,
        MessagesModule,
        SelectButtonModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    gorest = TestBed.inject(GorestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fetch the users', () => {
    users = [];
    spyOn(gorest, 'getUsers').and.returnValue(of(users));
    component.getUsers();
    expect(component.users).toEqual(users);
    expect(component.filteredData).toEqual(users);
  });

  it('should change params on page change', () => {
    event = { page: 1, rows: 10, first: 10, pageCount: 0 };
    component.onPageChange(event);
    expect(component.currentPage).toBe(event.page! + 1);
    expect(component.resultPerPage).toEqual(event.rows!);
    expect(component.elementDisplayed).toEqual(event.first!);
  });

  it('handle errors to getUsers method', () => {
    error = new HttpErrorResponse({});
    spyOn(gorest, 'getUsers').and.returnValue(throwError(() => error));
    component.getUsers();
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });

  it('no filter applyied ', () => {
    let filterValues = { field: '', query: '' };
    component.filterUsers(filterValues);
    expect(component.users).toEqual(component.filteredData);
  });

  it('should convert addNewUser falsy/truthy', () => {
    component.addNewUser = true;
    component.onClickAddUser();
    expect(component.addNewUser).toBeFalsy();

    component.onClickAddUser();
    expect(component.addNewUser).toBeTruthy();
  });

  it('call getUsers', () => {
    let id = 1;
    spyOn(gorest, 'removeUser').and.returnValue(of([]));
    let spy = spyOn(component, 'getUsers');
    component.removeUser(id);
    expect(spy).toHaveBeenCalled();
  });

  it('handle error on removeUser', () => {
    error = new HttpErrorResponse({});
    let id = 1;
    spyOn(gorest, 'removeUser').and.returnValue(throwError(() => error));
    component.removeUser(id);
    expect(component.errorMessage).toBeDefined();
    expect(component.message).toEqual([
      {
        severity: 'warn',
        summary: 'Warning',
        detail: component.errorMessage,
      },
    ]);
  });

  it('call getUsers', () => {
    user = { id: 1, name: '', email: '', gender: '', status: '' };
    spyOn(gorest, 'addNewUser').and.returnValue(of(user));
    let spy = spyOn(component, 'getUsers');
    component.addUser(user);
    expect(spy).toHaveBeenCalled();
  });

  it('handle error on removeUser', () => {
    user = { id: 1, name: '', email: '', gender: '', status: '' };
    error = new HttpErrorResponse({});
    spyOn(gorest, 'addNewUser').and.returnValue(throwError(() => error));
    component.addUser(user);
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
