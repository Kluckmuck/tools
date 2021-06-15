import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Booking } from 'src/app/models/Booking';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.sass']
})
export class BookingModalComponent implements OnInit {
  bookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    comment: new FormControl('')
  });
  newBooking: Booking = new Booking();

  constructor(
    public dialogRef: MatDialogRef<BookingModalComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(this.bookingForm);
  }
}
