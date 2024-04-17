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
    const user=localStorage.getItem("currentUser");
    if(user){
      this.logged_in = true;
    }
    
    
    
   
  

}
logout(){
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("role");
  this.router.navigateByUrl('/sign-in');
  location.reload();
}
}