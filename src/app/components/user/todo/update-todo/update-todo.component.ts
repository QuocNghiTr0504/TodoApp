import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../../../service/todo.service';
import { Todo } from '../../../../models/todo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-todo',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {
 
  todoForm: FormGroup;
  todoId: string | null = null;

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router, private route: ActivatedRoute) {
    this.todoForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.todoId = params.get('id');
      console.log('id',this.todoId)
      if (this.todoId) {
        this.todoService.getTodoById(this.todoId).subscribe({
          next: (todo) => {
            this.todoForm.patchValue(todo);
          },
          error: (err) => {
            console.error('Error fetching todo:', err);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid && this.todoId) {
      this.todoService.updateTodo(this.todoId, this.todoForm.value).subscribe({
        next: () => {
          this.router.navigate(['/todo']);
        },
        error: (err) => {
          console.error('Error updating todo:', err);
          alert('Error updating todo. Please try again.');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  closeModal(): void {
  }
}
