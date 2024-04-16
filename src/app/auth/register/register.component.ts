import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = {
    id: "",
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    isAdmin: false,
  };
  constructor(private authService: AuthService,private router:Router) {}

  onSubmit() {
    this.authService.signup(this.user).subscribe(
      (data) => {
        console.log('User added:', data);
        const isConfirmed = confirm('you have sign up with success go back to login page ?');
    if (isConfirmed) {
        this.router.navigate(['auth/login']);
    }
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
  }

}
