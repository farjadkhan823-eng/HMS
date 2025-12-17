import { Injectable } from '@angular/core';
import { User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
private key = 'users'  

 getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }
  saveUsers(list: User[]) {
    localStorage.setItem(this.key, JSON.stringify(list));
  }
  addUser(user : User){
    let users = this.getUsers();
    user.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(user);
    this.saveUsers(users);
  }
  updateUser(user:User){
    let users = this.getUsers();
    let findUser = users.findIndex(u => u.id === user.id);
    users[findUser] = user;
    this.saveUsers(users);
  }
  deleteUser(id : number) {
    let users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  }
}
