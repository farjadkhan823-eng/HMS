import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from '../../components/login/login';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet,Login],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {

}
