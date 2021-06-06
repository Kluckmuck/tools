import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private URL = 'http://localhost:8000/api/businesses/';  // URL to web api
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.URL);
  }

  getCompany(id: Number): Observable<Company> {
    const url = `${this.URL}${id}/`;
    return this.http.get<Company>(url);
  }

  searchCompanies(text: String): Observable<Company[]> {
    const url = `${this.URL}?search=${text}`;
    return this.http.get<Company[]>(url);
  }
}
