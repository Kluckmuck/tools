import { Component, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { Booking } from "../../../models/Booking";
import { Message } from "../../../models/Message";
import { User } from "../../../models/User";
import { MessageService } from "../../../services/message.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.sass"],
})
export class MessageFormComponent implements OnInit {
  @Input() booking: Booking;
  user: User;

  messageForm = new FormGroup({
    body: new FormControl("", Validators.required),
  });
  newMessage: Message = new Message();

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getMessages();
    this.getUser();
  }

  getMessages() {
    //this.messageService.getMessages().subscribe{
  }

  onSubmit(formDirective: FormGroupDirective) {
    const message: Message = this.toMessage(this.messageForm);
    this.messageService.sendMessage(message).subscribe(
      (data) => this.onSuccess(data, formDirective),
      (error) => console.log(error)
    );
    //Push message to list of messages
    //Clear Form if sucessfull
  }

  onSuccess(message: Message, formDirective: FormGroupDirective) {
    this.booking.messages.push(message);
    formDirective.resetForm();
    this.messageForm.reset();
  }

  getUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  toMessage(form: FormGroup): Message {
    const data = {
      booking: this.booking.id,
      name: this.user.username,
      body: form.value.body,
      created_on: new Date(),
    } as Message;
    return data;
  }
}