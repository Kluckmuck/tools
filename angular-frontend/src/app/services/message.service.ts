import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Message } from "../models/Message";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private URL = environment.API + "/api/messages/"; // URL to web api
  constructor(private http: HttpClient) {}

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.URL, message);
  }
}
