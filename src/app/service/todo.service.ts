import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  apiUrl:string ='https://localhost:7122';

  constructor(private http: HttpClient) { }

  getAllTodo(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.apiUrl + '/api/todo')
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(this.apiUrl+'/api/todo/'+ id);
  }

  addTodo(todoNew: Todo): Observable<Todo>{
    if (!todoNew.id) {
      todoNew.id = '00000000-0000-0000-0000-000000000000'; 
    }
    return this.http.post<Todo>(this.apiUrl + '/api/todo', todoNew);
  }
  
  updateTodo(id:string, todo:Todo): Observable<Todo>{
    return this.http.put<Todo>(this.apiUrl + '/api/todo/'+ id, todo)
  }

  deleteTodo(id:string): Observable<Todo>{
    return this.http.delete<Todo>(this.apiUrl + '/api/todo/' + id)
  }

}
