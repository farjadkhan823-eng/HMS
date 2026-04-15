    import { Component, inject , Input } from '@angular/core';
import { Router } from '@angular/router';
import { Logsign } from '../../services/logsign';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../../models/account.model';
import { UserService } from '../../services/user-service';
import { User , EUserRole} from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {
    
  }
  private loginService = inject(Logsign);
  private staffLogin = inject(UserService);
  private authService = inject(AuthService);


  userLoginObj = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(16),]),
  });

  onSubmit() {
    if (this.userLoginObj.invalid) return;
    const { email, password } = this.userLoginObj.value; 
    //for user/bookers //
    const accounts: Account[] = this.loginService.getAccounts();  //bookers
    const user = accounts.find(acc => acc.email === email && acc.password === password);
    const invalidError = accounts.find(acc => acc.email !== email && acc.password !== password);
    if (user) {
      this.authService.saveCurrentUserState(user);
      this.router.navigate(['guestBooking']);
    }

    if(invalidError){
     alert("incorrect email or password");
    }
    
    //for staff//
    const adminAccount : User[] = this.staffLogin.getUsers();  // staff/admin
    const staffUser = adminAccount.find(adm => adm.email === email && adm.password === password);
    this.authService.saveCurrentUserState(staffUser!);
    switch (staffUser?.role) {
      case EUserRole.ADMIN:
      this.router.navigate(['main/dashboard']);
      break;
      case EUserRole.MANAGER:
        this.router.navigate(['main/reports']);
        break;
       case EUserRole.ACCOUNTAT:
        this.router.navigate(['main/reports']);
        break;
        case EUserRole.RECEPTIONIST:
        this.router.navigate(['main/roomManagement']);
        break;
      default:
        break;
    }
    // if (role === EUserRole.ADMIN) {
    //   this.router.navigate(['main/dashboard']);
    // } else if (role === EUserRole.ACCOUNTAT) {

    // } else if (role === EUserRole.MANAGER) {

    // }
    

    // const managerAccount : User[] = this.staffLogin.getUsers();  // staff/manager
    // const manager = managerAccount.find(mng => mng.email === email && mng.password === password);
    // if(manager) {
    // this.router.navigate(['main/reports']);
    // }
  

  }

  loginToSignup() {
    this.router.navigate(['signup']);
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
