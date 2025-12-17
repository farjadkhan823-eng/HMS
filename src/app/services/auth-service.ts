import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private key  = 'auth'

   getUsers(): Auth[] {
      return JSON.parse(localStorage.getItem(this.key) || '[]');
    }
    saveUsers(list: Auth[]) {
      localStorage.setItem(this.key, JSON.stringify(list));
    }
    addUser(user : Auth){
      let users = this.getUsers();
      user.id = users.length ? users[users.length - 1].id + 1 : 1;
      users.push(user);
      this.saveUsers(users);
    }
}
