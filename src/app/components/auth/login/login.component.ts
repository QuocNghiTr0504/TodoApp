import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.role === 'Admin') {
          this.router.navigate(['/dashboard']);
        } if(response.role ==='User') {
          this.router.navigate(['/todo']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Sai tài khoản hoặc mật khẩu'; 
        console.error('Đăng nhập không thành công:', error);
      }
    });
  }
}
