import { Component, Input, OnInit } from "@angular/core";
import { Booking } from "../../../models/Booking";
import { Message } from "../../../models/Message";
import { MessageService } from "../../../services/message.service";

@Component({
  selector: "app-message-container",
  templateUrl: "./message-container.component.html",
  styleUrls: ["./message-container.component.sass"],
})
export class MessageContainerComponent implements OnInit {
  @Input() booking: Booking;

  constructor() {}

  ngOnInit() {}
}
