import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent {
  constructor(private AuthService: AuthService,private router: Router) {}
  isLoggedIn(): boolean {
    return this.AuthService.isLoggedIn();
  }
  
logout(): void {
  this.AuthService.logout();
  this.router.navigate(['/login']);
}
}
