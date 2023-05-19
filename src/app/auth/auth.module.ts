import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, HomeComponent, LogoutComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
