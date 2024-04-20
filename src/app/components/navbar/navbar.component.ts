import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logged_in: boolean = false;
  admin!: any;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.admin = sessionStorage.getItem("role");
    const user=localStorage.getItem("currentUser");
    if(user){
      this.logged_in = true;
    }
}
logout(){
  this.authService.logout();
  window.location.href = '/auth/login';
}
}