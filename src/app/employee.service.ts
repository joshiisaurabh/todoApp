import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Employee} from './employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/api/';

  getEmployeeList() {//Fetch employee list
    return this.http.get(this.baseUrl+"fetchEmployees");
  }
  createUser(employee: Employee) {
    return this.http.post(this.baseUrl+"addEmployee",employee);
  }

}
