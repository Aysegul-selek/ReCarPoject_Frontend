import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customeresponse } from '../models/customerResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = 'https://localhost:44324/api/Customers/getall';
  constructor(private httpClient: HttpClient) {}
  getCustomers(): Observable<Customeresponse> {
    return this.httpClient.get<Customeresponse>(this.apiUrl);
  }
}
