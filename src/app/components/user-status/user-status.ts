import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-status.html',
  styleUrl: './user-status.css',
})
export class UserStatus implements OnInit {
  activeUsers: User[] = [];
  inactiveUsers: User[] = [];


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadActiveStatus('active');
    this.loadInactiveStatus('inactive');
  }

  loadActiveStatus(status: string): void {
    this.activeUsers = this.userService.userActiveStatus(status);
  }
   loadInactiveStatus(status: string): void {
    this.inactiveUsers = this.userService.userInactiveStatus(status);
  }
}
