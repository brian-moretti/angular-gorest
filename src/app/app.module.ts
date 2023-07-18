import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { FieldsetModule } from 'primeng/fieldset';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';

import { HomeComponent } from './auth/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupComponent } from './auth/signup/signup.component';

import { DashboardComponent } from './users/components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './users/components/dashboard-header/dashboard-header.component';
import { SidebarMenuComponent } from './users/components/sidebar-menu/sidebar-menu.component';
import { UserDetailsComponent } from './users/components/user-details/user-details.component';
import { AddUserComponent } from './users/components/add-user/add-user.component';
import { AddPostComponent } from './users/components/add-post/add-post.component';
import { AddCommentComponent } from './users/components/add-comment/add-comment.component';
import { UserPostsComponent } from './users/components/user-posts/user-posts.component';
import { FilterPostsComponent } from './users/components/filter-posts/filter-posts.component';
import { FooterComponent } from './users/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    LogoutComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    SidebarMenuComponent,
    UserDetailsComponent,
    AddUserComponent,
    AddPostComponent,
    AddCommentComponent,
    UserPostsComponent,
    FilterPostsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PasswordModule,
    FieldsetModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    SidebarModule,
    MessagesModule,
    DividerModule,
    DropdownModule,
    CardModule,
    TabViewModule,
    RadioButtonModule,
    PaginatorModule,
    ButtonModule,
    SelectButtonModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
