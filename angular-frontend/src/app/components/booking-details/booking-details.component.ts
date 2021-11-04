import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Booking } from "../../models/Booking";
import { BookingService } from "src/app/services/booking.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-booking-details",
  templateUrl: "./booking-details.component.html",
  styleUrls: ["./booking-details.component.sass"],
})
export class BookingDetailsComponent implements OnInit {
  @Input() booking: Booking;
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
      });
  }
}
