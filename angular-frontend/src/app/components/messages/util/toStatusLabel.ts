import { BookingStatus } from "../../../models/BookingStatus";

export function toStatusLabel(status: BookingStatus): string {
  switch (status) {
    case "AC":
      return "Accepted";
    case "PN":
      return "Pending";
    case "DN":
      return "Denied";
    default:
      return "Unknown";
  }
}
