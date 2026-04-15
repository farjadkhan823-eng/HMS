import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EBooking, ECtg, EStatus } from '../../models/booking.model';
import { BookingService } from '../../services/booking-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomDetailService } from '../../services/room-detail-service';

@Component({
  selector: 'app-booking-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-management.html',
  styleUrl: './booking-management.css',
})
export class BookingManagement implements OnInit {

  bookings: EBooking[] = [];
  ECtg = ECtg;
  EStatus = EStatus;
  feedbackInput = '';
  feedbackId!: number;
  selectedRow: EBooking | null = null;

  constructor(private bookingService: BookingService , private roomDtlService: RoomDetailService) { }

  ngOnInit() {
    this.load();
  }

  rejectedStatus(id?: number) {
    this.bookingService.toggleBookingStatus(id!, EStatus.REJECTED);
    this.load();
  }

  confirmedStatus(id: number) {
    this.bookingService.toggleBookingStatus(id, EStatus.CONFIRMED);
    this.load();
  }

confirmation(confirm: boolean) {
  if (!this.selectedRow) return;

  const booking = this.selectedRow;
  const newStatus = confirm ? EStatus.CONFIRMED : EStatus.REJECTED;

  this.bookingService.toggleBookingStatus(booking.id, newStatus);

  booking.roomNumbers.forEach((rn: string) => {
    this.roomDtlService.updateRoomReason(
      booking.roomCtg,
      rn,
      confirm ? 'Booked' : 'Free'
    );
  });

  this.closeModalAgain();
  this.load();
}



  load() {
    this.bookings = this.bookingService.getBookings();
  }

  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  open(booking: EBooking) {
    this.feedbackId = booking.id;
    this.feedbackInput = booking.feedback || '';
    this.modal.nativeElement.showModal();
  }

  saveFeedback() {
    this.bookingService.Feedback(this.feedbackId, this.feedbackInput);
    this.modal.nativeElement.close();
    this.feedbackInput = '';
    this.load();
  }

  isModalOpenAgain = false;

  openModalAgain(booking: EBooking): void {
    this.selectedRow = booking;
    this.isModalOpenAgain = true;
  }

  closeModalAgain(): void {
    this.selectedRow = null;
    this.isModalOpenAgain = false;
  }
}
