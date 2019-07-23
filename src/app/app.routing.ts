import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {TodoComponent} from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';


const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent},
  {path : '', component : LoginComponent},
  {path : 'addTodo', component : TodoComponent},
  {path : 'register', component : SignupComponent},
  {path : 'login', component : LoginComponent},
  {path : 'error', component : ErrorComponent}
];

export const routing = RouterModule.forRoot(routes);
