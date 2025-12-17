import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/login/login';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';
import { Main } from './layouts/main/main';
import { Auth } from './layouts/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Login,Sidebar,Dashboard,Main,Auth],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HMS');
}
