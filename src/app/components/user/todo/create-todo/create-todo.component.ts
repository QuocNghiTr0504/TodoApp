import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../../../service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder,private todoService: TodoService,private router: Router) {
    this.todoForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['todo', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.todoService.addTodo(this.todoForm.value).subscribe({
        next: (todo) => {
          this.router.navigate(['/todo'])
        },
        error: (err) => {
          console.error('Error adding task:', err);
        }
      });
    } else {
      alert('Please fill out the form correctly');
    }
  }

}
