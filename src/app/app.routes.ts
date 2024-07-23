import { Routes } from '@angular/router';
import { TodolistComponent } from './components/user/todo/todolist/todolist.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateTodoComponent } from './components/user/todo/create-todo/create-todo.component';
import { UpdateTodoComponent } from './components/user/todo/update-todo/update-todo.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

export const routes: Routes = [
    

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'todo',
    component: TodolistComponent, 
  },
  {
    path: 'create',
    component: CreateTodoComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'update/:id',
    component: UpdateTodoComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    
  },
  {
    path: '**',
    redirectTo: 'login'  
  },

];
