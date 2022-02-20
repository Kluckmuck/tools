import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { pipe } from "@angular/core/src/render3";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Booking } from "../models/Booking";
import { BookingStatus } from "../models/BookingStatus";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private URL = environment.API + "/api/bookings/"; // URL to web api
  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<Booking> {
    let data = {
      comments: booking.comments,
      location: booking.location,
      date: this.mergeDateAndTime(booking.date, booking.time).toISOString(),
      operator: booking.operator,
    };
    console.log(JSON.stringify(data, null, 2));
    return this.http.post<Booking>(this.URL, data);
  }

  getBooking(id: Number): Observable<Booking> {
    const url = `${this.URL}${id}/`;
    return this.http.get<Booking>(url);
  }

  acceptBooking(id: Number, booking: Booking): Observable<Booking> {
    const url = `${this.URL}${id}/accept/`;
    return this.http.put<Booking>(url, booking);
  }

  denyBooking(id: Number, booking: Booking): Observable<Booking> {
    const url = `${this.URL}${id}/deny/`;
    return this.http.put<Booking>(url, booking);
  }

  private mergeDateAndTime(date: Date, time: Date): Date {
    const d = date.toString();
    const t = time.toString();
    const t1: any = t.split(" ");
    const t2: any = t1[0].split(":");
    t2[0] = t1[1] === "PM" ? 1 * t2[0] + 12 : t2[0];
    const t24 = (t2[0] < 10 ? "0" + t2[0] : t2[0]) + ":" + t2[1];
    const completeDate = d.replace("00:00", t24.toString());
    return new Date(completeDate);
  }
}
