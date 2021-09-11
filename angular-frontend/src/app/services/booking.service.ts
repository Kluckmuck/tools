import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from '@angular/core/src/render3';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private URL = environment.API + '/api/bookings/';  // URL to web api
  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    let data =  {
      comments: booking.comments,
      location: booking.location,
      date: this.mergeDateAndTime(booking.date, booking.time).toISOString(),
      operator: booking.operator
    };
    return this.http.post<Booking>(this.URL, data);
  }

  private mergeDateAndTime(date: Date, time: Date): Date {
    const d = date.toString();
    const t = time.toString();
    console.log("date; " + d);
    console.log("time" + t);
    const t1: any = t.split(' ');
    const t2: any = t1[0].split(':');
    t2[0] = (t1[1] === 'PM' ? (1 * t2[0] + 12) : t2[0]);
    const t24 = (t2[0] < 10 ? '0' + t2[0] : t2[0]) + ':' + t2[1];
    const completeDate = d.replace("00:00", t24.toString());
    return new Date(completeDate);
  }
}
