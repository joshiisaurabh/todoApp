import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/api/';

  getTodoList() {//Fetch employee list
    return this.http.get(this.baseUrl+"fetchTodoList");
  }
  createTodo(todo) {
    return this.http.post(this.baseUrl+"addTodo",todo);
  }
  authenticate(iObj){
    return this.http.post(this.baseUrl+"authenticate",iObj);
  }
  register(iObj){
    return this.http.post(this.baseUrl+"register",iObj);
  }
  deleteTodo(iObj){
    return this.http.post(this.baseUrl+"delete",iObj);
  }
}
