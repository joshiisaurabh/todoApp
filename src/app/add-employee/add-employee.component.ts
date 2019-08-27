import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import { FileDetector } from '../../../node_modules/@types/selenium-webdriver/remote';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export 
class AddEmployeeComponent implements OnInit {
  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    ////
    this.addForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      state:['', Validators.required],
      city:['', Validators.required],
      address:['', Validators.required]

    });
  }
  onSubmit() {
    this.employeeService.createUser(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['']);
      },validate=>{
        var field=validate.error.errors[0].param;
        alert("Please check "+field + " field!")
      });
  }

}
