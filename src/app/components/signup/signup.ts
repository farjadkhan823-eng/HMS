import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Logsign } from '../../services/logsign';
import { Account } from '../../models/account.model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  constructor(private router: Router) {}
  private signInService = inject(Logsign);

  account: Account[] = [];

  userSignupObj = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(16),]),
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.account = this.signInService.getAccounts();
  }

  onSubmit() {
    if (this.userSignupObj.invalid) return;

    const formValue = this.userSignupObj.value;

   const alreadyEmail = this.account.find(acc => acc.email === formValue.email)
     if (alreadyEmail) {
    alert('This email already exists!');
    return;
  }

    const newAccount: Account = {
      id: 0,
      name: formValue.userName!,
      email: formValue.email!,
      password: formValue.password!,
    };

    this.signInService.addAccount(newAccount);
    this.userSignupObj.reset();
    this.router.navigate(['login']);
  }

  SignupToLogin() {
    this.router.navigate(['login']);
  }

      showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
