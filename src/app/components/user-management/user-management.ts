import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User, EUserRole } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {
  
  users: User[] = [];

  formGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('',Validators.minLength(8)),
    role: new FormControl(EUserRole.ADMIN),
    status: new FormControl('active')
  });

    onSubmit() {
      // alert("Added Succesfully")
  }

  form: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: EUserRole.ADMIN,
    status: 'active'
  };
  
  editUser = false;
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.users = this.userService.getUsers();
  }

  save() {
    if (this.editUser) {
      this.userService.updateUser(this.formGroup.value as User);  // added
    } else {
      this.userService.addUser(this.formGroup.value as User);   // added
    }
    this.reset();
    this.load();
  }

  edit(user: User) {
    this.editUser = true;
    this.formGroup.patchValue({...user}) // added
  }

  delete(id: number) {
    this.userService.deleteUser(id);
    this.load();
  }

  reset() {
    this.editUser = false;
    this.form = {id: 0,name: '',email: '',password: '',role: EUserRole.ADMIN,status: 'active'};
    this.formGroup.reset(this.form); 
  }
}
