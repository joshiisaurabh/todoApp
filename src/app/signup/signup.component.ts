import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from '../todo-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router,private todoService:TodoServiceService) { }

  ngOnInit() {
  }
  registerUser(){
    let userid:any=document.getElementById("email")
    let pwd:any=document.getElementById("pwd")
    let firstName:any=document.getElementById("firstName")
    let lastName:any=document.getElementById("lastName")
    let name:any=firstName.value+lastName.value;
    this.todoService.register({email:userid.value,password:pwd.value,name:name}).subscribe( data => {
     var response:any=data;
      if(response.auth){
        alert("Register successfull")
        this.router.navigate(['/login']);
        console.log("success")
     }else{
      alert("Email Id already present");
     }
    });
  }
}
