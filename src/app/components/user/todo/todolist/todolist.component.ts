import { Component, OnInit } from '@angular/core';
import { Todo } from '../../../../models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../../service/todo.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service'; // Import AuthService

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers: [TodoService]
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  filteredAndSortedTodos: Todo[] = [];
  todoForm: FormGroup;
  filterStatus: string = '';
  sortOrder: string = 'asc';
  isLoggedIn: boolean = false; 

  constructor(private todoService: TodoService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['todo', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.checkLoginStatus().subscribe(status => {
      this.isLoggedIn = status; 
    });
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAllTodo().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
      }
    });
  }

  deleteTodobyID(id: string): void {
    if (this.isLoggedIn) {
      if (confirm('Are you sure you want to delete this Todo?')) {
        this.todoService.deleteTodo(id).subscribe({
          next: () => {
            this.loadTodos();
          },
          error: (err) => {
            console.error('Error deleting todo:', err);
          }
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  applyFilters(): void {
    let filteredTodos = this.todos;
    if (this.filterStatus) {
      filteredTodos = filteredTodos.filter(todo => todo.status === this.filterStatus);
    }

    if (this.sortOrder === 'asc') {
      filteredTodos.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    } else {
      filteredTodos.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    }

    this.filteredAndSortedTodos = filteredTodos;
  }
}
