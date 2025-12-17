import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
     fName: string = '';
     lName: string = '';
     email: string = '';
     message: string = '';


submitForm(){
  alert("Form Submit Successfully")
}
}
