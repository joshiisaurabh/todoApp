import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from '../todo-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoListArray:any=[];
  createTodoFlag=false;
  hoverFlag=false;
  selectedTodoIndex;
  constructor(private router: Router,private todoService:TodoServiceService) { }
  
  ngOnInit() {
    this.todoService.getTodoList()
    .subscribe( data => {
      let response:any=data;
      if(response.auth){
        this.todoListArray = response.data;
      }else{
        this.router.navigate(['/error']);

      }
      console.log(data)
      
      
    });
  }
  toogle(){
    this.createTodoFlag=!this.createTodoFlag
  //  this.todoTitle="";
  }
  logout(){
    const token =localStorage.removeItem("token"); // you probably want to store it in localStorage or something
    let userId =localStorage.removeItem("userId");
    this.router.navigate(['/login']);

  }
  deleteTodo(iObj,index){
   console.log(iObj,index)
   this.todoService.deleteTodo({id:iObj._id}).
   subscribe( data => {
    let response:any=data;
    if(response.auth){
    }else{
      this.router.navigate(['/error']);
    }
    this.todoListArray.splice(index,1)

  });

  }
  create(){
     var text:any=document.getElementById('comment')
     console.log(text.value);
    this.todoService.createTodo({title:text.value})
    .subscribe( data => {
      let response:any=data;
      if(response.auth){
        this.todoListArray.push(response.data)

      }else{
        this.router.navigate(['/error']);

      }
    });
    this.toogle();
  }
  Text($event){
       console.log($event);
  }
}
