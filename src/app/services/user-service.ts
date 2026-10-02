import { Injectable } from '@angular/core';
import { User, EUserRole } from '../models/user.model'; 

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private key = 'users';

  constructor() {
    this.initializeDefaultAdmin();
  }

  private initializeDefaultAdmin() {
    let users = this.getUsers();
    
    const hasAdmin = users.some(u => u.role === EUserRole.ADMIN);
    
    if (users.length === 0 || !hasAdmin) {
      const defaultAdmin: User = {
        id: 1,
        name: 'System Admin',
        email: 'admin@gmail.com',         
        password: 'admin123',             
        role: EUserRole.ADMIN,            
        status: 'Active'                  
      };
      
      if (users.length > 0) {
        defaultAdmin.id = users[users.length - 1].id + 1;
      }

      users.push(defaultAdmin);
      this.saveUsers(users);
    }
  }

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
    if (findUser !== -1) {
      users[findUser] = user;
      this.saveUsers(users);
    }
  }

  deleteUser(id : number) {
    let users = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(users);
  }

  userActiveStatus(status: string): User[] {
    return this.getUsers().filter(u => u.status === status);
  }

  activeUserLength(status:string):number{ 
    return this.userActiveStatus(status).length;
  }

  userInactiveStatus(status: string): User[] {
    return this.getUsers().filter(u => u.status === status);
  }
}
