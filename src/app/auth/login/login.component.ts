import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        console.log('Login successful');

       
        this.userService.getUserByEmail(this.email).subscribe((user) => {
          if (user) {
            console.log('Fetched user:', user);
            this.userService.setCurrentUser(user);

            // Check user role and navigate to the appropriate dashboard
            if (user.isAdmin) {
              // Replace 'admin' with the actual value for admin role

              this.router.navigate(['/Admin-meetingroom-list']);
            } else {
              this.router.navigate(['dash']);
            }
          }
        });
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
}
