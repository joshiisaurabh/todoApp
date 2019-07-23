import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees:any=[];
  constructor(private router: Router,private employeeService:EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList()
    .subscribe( data => {
      console.log(data)
      this.employees = data;
    });
  }
  addEmployee(): void {
    this.router.navigate(['add-employee']);
  };

}
