import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, RouterLinkActive, RouterLink ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todoList'; 
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkLoginStatus().subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.userRole = this.authService.getRole();
        if (this.userRole === 'admin') {
          this.router.navigate(['/dashboard']);
        } 
        if (this.userRole === 'user') {
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
