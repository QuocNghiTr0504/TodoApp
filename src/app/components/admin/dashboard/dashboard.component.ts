import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../service/userstate.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showUserModal: boolean = false;
  isUpdateMode: boolean = false;
  currentUser: User = { id: 0, username: '', email: '', role: '' };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => 
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openCreateUserModal(): void {
    this.currentUser = { id: 0, username: '', email: '', role: '' };
    this.isUpdateMode = false;
    this.showUserModal = true;
  }

  openUpdateUserModal(user: User): void {
    this.currentUser = { ...user };
    this.isUpdateMode = true;
    this.showUserModal = true;
  }

  closeUserModal(): void {
    this.showUserModal = false;
  }

  createUser(): void {
    this.userService.createUser(this.currentUser).subscribe(() => {
      this.loadUsers();
      this.closeUserModal();
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.currentUser).subscribe(() => {
      this.loadUsers();
      this.closeUserModal();
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
