import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PasswordModule } from 'primeng/password';
import { FieldsetModule } from 'primeng/fieldset';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    FieldsetModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    LogRoutingModule,
  ],
})
export class LogModule {}
