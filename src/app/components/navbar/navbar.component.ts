import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  ngDoCheck() {
    this.admin = sessionStorage.getItem("role");
    const user_sesson_id = sessionStorage.getItem("user_session_id");
    if(user_sesson_id){
      this.logged_in = true;
    }

  

}
logout(){
  sessionStorage.removeItem("user_session_id");
  sessionStorage.removeItem("role");
  this.router.navigateByUrl('/sign-in');
  location.reload();
}
}