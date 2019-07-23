import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from "@angular/common/http";
import {routing} from "./app.routing";
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';


import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import {AuthServiceService} from './auth-service.service';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    TodoComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass:AuthServiceService , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
