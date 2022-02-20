import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Booking } from "../../models/Booking";
import { BookingService } from "src/app/services/booking.service";
import { toStatusLabel } from "../messages/util/toStatusLabel";

@Component({
  selector: "app-booking-details",
  templateUrl: "./booking-details.component.html",
  styleUrls: ["./booking-details.component.sass"],
})
export class BookingDetailsComponent implements OnInit {
  @Input() booking: Booking;
  statusLabel: string;
  constructor(
    private route: ActivatedRoute,
    private bookingsService: BookingService
  ) {}

  ngOnInit() {
    this.getBooking();
  }

  getBooking() {
    this.bookingsService
      .getBooking(parseInt(this.route.snapshot.paramMap.get("id")))
      .subscribe((booking) => {
        this.booking = booking;
        this.statusLabel = toStatusLabel(booking.status);
      });
  }

  acceptBooking() {
    this.bookingsService
      .acceptBooking(
        parseInt(this.route.snapshot.paramMap.get("id")),
        this.booking
      )
      .subscribe((booking) => {
        this.booking = booking;
        this.statusLabel = toStatusLabel(booking.status);
      });
  }

  denyBooking() {
    this.bookingsService
      .denyBooking(
        parseInt(this.route.snapshot.paramMap.get("id")),
        this.booking
      )
      .subscribe((booking) => {
        this.booking = booking;
        this.statusLabel = toStatusLabel(booking.status);
      });
  }
}
