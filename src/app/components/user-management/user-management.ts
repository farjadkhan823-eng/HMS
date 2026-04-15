import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Logsign } from '../../services/logsign';
import { User, EUserRole } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl , Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css',
})
export class UserManagement {

  constructor(private userService: UserService, private loginService :  Logsign, private router : Router) {
   
  // const role = localStorage.getItem('accounts');

  //   if (role !== EUserRole.ADMIN) {
  //     if (role === EUserRole.ACCOUNTAT) {
  //       this.router.navigate(['main/reports']);
  //     }
  //     else if (role === EUserRole.RECEPTIONIST) {
  //       this.router.navigate(['main/roomManagement']);
  //     }
  //     else {
  //       this.router.navigate(['']);
  //     }
  //   }
  }

  users: User[] = [];

  formGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('',[Validators.minLength(8), Validators.maxLength(16)]),
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
  

  ngOnInit() {
    this.load();
  }

  load() {
    this.users = this.userService.getUsers();
  }

save() {
  const formValue = this.formGroup.value as User;

  const alreadyEmail = this.users.find(u => u.email === formValue.email && u.id !== formValue.id);
  if (alreadyEmail) {
    alert('This email already exists!');
    return;
  }

  if (this.editUser) {
    this.userService.updateUser(formValue);
  } else {
    this.userService.addUser(formValue);
  }

  this.reset();
  this.load();
}


  edit(user: User) {
    this.editUser = true;
    this.formGroup.patchValue(user) // added
  }

  delete(id: number) {
    this.userService.deleteUser(id);
    this.load();
  }

  reset() {
    this.form = {id: 0,name: '',email: '',password: '',role: EUserRole.ADMIN,status: 'active'}; 
    this.formGroup.reset(this.form); 
  }

    showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
