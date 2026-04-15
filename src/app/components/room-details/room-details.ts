import { Component , OnInit} from '@angular/core';
import { RoomService } from '../../services/room-service';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-room-details',
  imports: [CommonModule],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css',
})
export class RoomDetails implements OnInit{
 categories: string[] =[];
 rooms : Room[] =[];
 selectedCtg = '';


constructor(private roomService :  RoomService){}

  ngOnInit(): void {
    this.loadCategories();
  //  let num:number = 20;  
  //  console.log(num)
  }

  loadCategories(){
    this.categories = this.roomService.getUniqueCtg();
  }

  onCtgClick(ctg: string){
    this.selectedCtg = ctg;
    this.rooms = this.roomService.getRoomByCtg(ctg);
    // console.log(this.rooms)
  }

  getRoomImage(image: string): string {
    return 'assets/' + image.split('C:\\fakepath\\')[1];
  }

}
