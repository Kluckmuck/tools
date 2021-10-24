import { Booking } from "./Booking";
import { Company } from "./Company";

export class User {
  url: string;
  id: number;
  username: string;
  email: string;
  companies?: Company[];
  bookings?: Booking;
}
