import { Injectable, signal } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Account, EUserRole } from '../models/account.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private key = 'auth';
  private isAuthenticatedUser = signal(false);
  private userState = signal<User | Account | null>(null);
  public userState$ = this.userState.asReadonly();
  public isAuthenticatedUser$ = this.isAuthenticatedUser.asReadonly();

  constructor() {
    this.restoreUserState();
  }

  restoreUserState(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');    
    this.userState.set(currentUser);
    this.isAuthenticatedUser.set(currentUser ? true : false);
  }

  getUsers(): Auth[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }
  saveUsers(list: Auth[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  saveCurrentUserState(user: User | Account): void {
    if (!user) return;
    const mapUser = {
      email: user?.email,
      id: user?.id,
      name: user?.name,
      role:  (user as User)['role'] ?? 'GuestUser'
    };
    localStorage.setItem('currentUser', JSON.stringify(mapUser));
    this.restoreUserState();
  }

  logoutUser(): void {
    localStorage.removeItem('currentUser');
    this.restoreUserState();
  }

  addUser(user: Auth) {
    let users = this.getUsers();
    user.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(user);
    this.saveUsers(users);
  }
}

export const USER_PERMISSIONS = {
  'GuestUser': [
    '/guestBooking',
    '/main/roomDetails',
    '/main/about',
    '/main/contact',
    '/main/privacyPolicy',

  ],
  'Admin': [
    '/main/roomDetails',
    '/main/about',
    '/main/contact',
    '/main/privacyPolicy',
    '/main/dashboard',
    '/main/roomManagement',
    '/main/userManagement',
    '/main/bookingManagement',
    '/main/reports',
  ],
  'Manager': [
    '/main/roomDetails',
    '/main/about',
    '/main/contact',
    '/main/privacyPolicy',
    '/main/roomManagement',
    '/main/bookingManagement',
    '/main/reports'
  ],
  'Accountant': [
    '/main/about',
    '/main/contact',
    '/main/privacyPolicy',
    '/main/roomManagement',
    '/main/bookingManagement',
   
  ],
  'Receptionist': [
    '/main/about',
    '/main/contact',
    '/main/privacyPolicy',
    '/main/dashboard',
    '/main/bookingManagement',

  ]
}