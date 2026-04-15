import { Component , computed} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService , USER_PERMISSIONS} from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  userRole = computed(() => this.authService.userState$()?.role);
  permissions = computed(() => {
    const role = this.userRole();
    return role ?  USER_PERMISSIONS[role] ?? [] : [];
  });

    hasAccess(route: string): boolean {
    return this.permissions().includes(route);
  }

  constructor(private router: Router, private authService: AuthService) {}
 backToLogin() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  } 

  roomDetails() 
  { this.router.navigate(['main/roomDetails']);
   }

  
}
