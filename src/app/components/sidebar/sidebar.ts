import { Component } from '@angular/core';
import { Dashboard } from '../dashboard/dashboard';
import {UserManagement} from '../user-management/user-management'
import { Router, RouterLink , RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

}
