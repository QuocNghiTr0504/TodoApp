import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet,CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = 'Email has been used'; 
        console.error('Đăng ký không thành công:', error);
      }
    });
  }
}
