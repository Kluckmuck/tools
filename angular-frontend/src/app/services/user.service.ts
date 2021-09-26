import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = environment.API + '/api/users/'
  constructor(private http: HttpClient) { }


  getUser(): Observable<User> {
    return this.http.get<User>(this.URL+'current/')
  }
}
