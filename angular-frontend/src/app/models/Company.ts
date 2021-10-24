import { Booking } from "./Booking";

export class Company {
  id: number;
  name: string;
  location: string;
  description: string;
  bookings: Booking[];
  owner: string;
}
