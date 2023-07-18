import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { AddUserComponent } from '../add-user/add-user.component';
import { MessagesModule } from 'primeng/messages';
import { FooterComponent } from '../footer/footer.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { GorestService } from 'src/app/services/gorest.service';
import { filter, of, throwError } from 'rxjs';
import { UsersGoRest } from 'src/app/models/gorest.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorsService } from 'src/app/services/errors.service';
import { FilterService } from 'primeng/api';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let gorest: GorestService;
  let users: UsersGoRest[];
  let error: HttpErrorResponse;
  let handleError: ErrorsService;

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
    handleError = TestBed.inject(ErrorsService);
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

  it('no filter applyied ', ()=>{
    let filterValues = {field: '', query: ''}
    component.filterUsers(filterValues)
    expect(component.users).toEqual(component.filteredData)
  })

  it('should convert addNewUser falsy/truthy', () => {
    component.addNewUser = true
    component.onClickAddUser()
    expect(component.addNewUser).toBeFalsy()

    component.onClickAddUser()
    expect(component.addNewUser).toBeTruthy()
  })

});
