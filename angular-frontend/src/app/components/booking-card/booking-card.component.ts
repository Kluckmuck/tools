import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Booking } from "../../models/Booking";

@Component({
  selector: "app-booking-card",
  templateUrl: "./booking-card.component.html",
  styleUrls: ["./booking-card.component.sass"],
})
export class BookingCardComponent implements OnInit {
  @Input() booking: Booking;
  constructor(private router: Router) {}

  ngOnInit() {}

  handleClick() {
    this.booking.id
      ? this.router.navigate(["booking/", this.booking.id])
      : console.log("could not find id");
  }
}
