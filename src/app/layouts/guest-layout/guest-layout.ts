import { Component, ElementRef, ViewChild } from '@angular/core';
import { BookingService } from '../../services/booking-service';
import { EBooking, ECtg, EStatus } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from '../../services/auth-service';
import { RoomService } from '../../services/room-service';
import { RoomDetailService } from '../../services/room-detail-service';
import { Reason } from '../../models/room-details.model';
import { RoomDetails } from '../../components/room-details/room-details';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './guest-layout.html',
  styleUrl: './guest-layout.css',
})
export class GuestLayout {
  price = 1500;
  ECtg = ECtg;
  EStatus = EStatus;
  bookings: EBooking[] = [];
  editBooking = false;
  bookingStatus = EStatus.PENDING;
  selectedBooking!: EBooking;
  feedbackInput = '';
  bookingToDelete!: number;
  // roomR = RoomDetails;
  currentUserEmail: string = '';

  
  bookingForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    phone: new FormControl(0, Validators.required),
    roomCtg: new FormControl(ECtg.STANDARD),
    roomQty: new FormControl(1, Validators.required),
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required])
  });

  form: EBooking = {
    id: 0,
    name: '',
    phone: 0,
    email:'',
    roomCtg: ECtg.STANDARD,
    roomQty: 1,
    checkIn: '',
    checkOut: '',
    days: 0,
    price: 0,
    status: EStatus.PENDING,
    feedback: '',
    timing:0,
    roomNumbers:[]
  };

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  constructor(private bookingService: BookingService, private router: Router, private authService: AuthService, private roomService: RoomService, private roomDtlService: RoomDetailService) {}
ngOnInit() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser) {
    alert('Please login first');
    this.router.navigate(['']);
    return;
  }
  this.currentUserEmail = currentUser.email;
  this.load();
}
  load() {
    this.bookings = this.bookingService.getBookings();
  }

save() {
  const booking = this.bookingForm.value as EBooking;
  booking.email = this.currentUserEmail;
  booking.days = this.getDays(booking.checkIn, booking.checkOut);

  const freeRooms = this.roomDtlService.getFreeRoomsByCtg(booking.roomCtg);
  if (freeRooms.length < booking.roomQty) {
    alert(`Only ${freeRooms.length} rooms available in this category`);
    return;
  }

  const selectedRooms = freeRooms.slice(0, booking.roomQty);
  const roomNumbers = selectedRooms.map(r => r.roomNo);
  booking.roomNumbers = roomNumbers;

  const selectedRoom = this.roomService.rooms().find(r => r.room === booking.roomCtg as string);
  const roomPrice = selectedRoom ? selectedRoom.price : 0;
  booking.price = roomPrice * booking.roomQty * booking.days;

  booking.status = EStatus.PENDING;
  booking.timing = Date.now();

  if (this.editBooking) {
    this.bookingService.updateBooking(booking);
  } else {
    this.bookingService.addBooking(booking);
  }

  roomNumbers.forEach(rn => {
    this.roomDtlService.updateRoomReason(booking.roomCtg, rn, 'Pending');
  });

  this.reset();
  this.load();
}

delete(id: number) {
  const booking = this.bookingService.getBookings().find(b => b.id === id);
  if (!booking) return;

  if (booking.status === EStatus.PENDING && booking.roomNumbers?.length) {
    this.roomDtlService.resetPendingRooms(booking.roomCtg, booking.roomNumbers);
  }

  this.bookingService.deleteBooking(id);
  this.load();
}

  reset() {
    this.editBooking = false;
    this.form = {
      id: 0, name: '', phone: 0,email: '' ,roomCtg: ECtg.STANDARD,
      roomQty: 1, checkIn: '', checkOut: '', days: 0, price: 0,
      status: EStatus.PENDING, feedback: '',timing:0,roomNumbers:[]
    };
    this.bookingForm.reset(this.form);
  }

  roomDetails() { this.router.navigate(['main/roomDetails']); }
  backToLogin() {
    this.authService.logoutUser();
    this.router.navigate(['']);
  }

  getDays(checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  open(booking: EBooking) {
    if (booking.status !== EStatus.REJECTED) return;
    this.selectedBooking = booking;
    this.feedbackInput = booking.feedback || '';
    this.modal.nativeElement.showModal();
  }

  saveFeedback() {
    if (!this.selectedBooking) return;
    this.bookingService.Feedback(this.selectedBooking.id, this.feedbackInput);
    this.selectedBooking.feedback = this.feedbackInput;
    this.modal.nativeElement.close();
    this.feedbackInput = '';
    this.load();
  }

  cancelByTiming(booking:EBooking): boolean{
    const hours = 24 * 60 * 60 * 1000;
    return Date.now() - booking.timing < hours;
  }
  close() {
    this.modal.nativeElement.close();
  }

  downloadPDF(booking?: EBooking) {
    const doc = new jsPDF();

    doc.setFillColor(200, 169, 79);
    doc.rect(0, 0, 210, 25, 'F');

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('Classic Star Hotel', 14, 16);

    doc.setFontSize(10);
    doc.text('Booking Invoice', 160, 16);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    doc.roundedRect(14, 30, 182, 22, 3, 3);
    doc.text('Address:  ', 18, 38);
    doc.text('Phone: +92 123-456-789-0', 18, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 38);
    doc.text(`Time: ${new Date().toLocaleTimeString()}`, 150, 45);

    const tableColumns = [
      'ID', 'Name', 'Room Type', 'Room Qty', 'Check-In', 'Check-Out', 'Amount'
    ];

    const tableRows = booking ? [booking].map(b => [
      b.id, b.name, b.roomCtg, b.roomQty, b.checkIn, b.checkOut, `RS : ${b.price}`
    ]) :
      this.bookings.map(b => [
        b.id, b.name, b.roomCtg, b.roomQty, b.checkIn, b.checkOut, `RS : ${b.price}`
      ]);

    autoTable(doc, {
      startY: 60,
      head: [tableColumns],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 4, valign: 'middle', halign: 'center', lineWidth: 0.3 },
      headStyles: { fillColor: [200, 169, 79], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: { 1: { halign: 'left' } }
    });

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.roundedRect(14, finalY, 182, 20, 3, 3);
    doc.setFontSize(11);
    doc.text('Thank you for choosing Classic Star Hotel!', 72, finalY + 10);

    doc.setFontSize(9);
    doc.text('This is a system generated invoice.', 83, finalY + 15);

    doc.save('Classic-Star-Hotel-Invoice.pdf');
  }

  isModalOpenAgain = false;

openModalAgain(id: number): void {
  this.bookingToDelete = id;
  this.isModalOpenAgain = true;
}

  closeModalAgain(): void {
    this.isModalOpenAgain = false;
  }
}



