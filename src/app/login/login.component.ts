import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from '../todo-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private todoService:TodoServiceService) { }

  ngOnInit() {
  }
  checkLogin(){
    let userid:any=document.getElementById("email")
    let pwd:any=document.getElementById("pwd")
    this.todoService.authenticate({email:userid.value,password:pwd.value}).subscribe( data => {
     var response:any=data;
      if(response.auth &&response.auth){
        localStorage.setItem("token",response.token);
        localStorage.setItem("userId",response.userId);

        this.router.navigate(['/addTodo']);
        console.log(response);
     }else{
      this.router.navigate(['/error']);
     }
      
    });
  }
  registerUser(){
    this.router.navigate(['/register']);
  }
}
