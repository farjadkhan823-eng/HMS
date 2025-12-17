import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl , Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
 constructor(private router: Router) {}

signIn = new FormGroup({
    id: new FormControl(0),
    userName: new FormControl('', Validators.required),
  });


  login() {
    this.router.navigate(['main/dashboard']);
  }
    booking() {
    this.router.navigate(['main/booking']);
  }
}
