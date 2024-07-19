import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule,RouterOutlet,RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'todoList';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        const role = this.authService.getRole();
        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } 
        if(role === 'user') {
          this.router.navigate(['/todo']);
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
