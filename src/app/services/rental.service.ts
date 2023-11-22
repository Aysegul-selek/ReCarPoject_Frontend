import { Injectable } from '@angular/core';
import { RentalResponse } from '../models/rentalResponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44324/api/Rentals/getall';
  constructor(private httpClient: HttpClient) { }
   getRentals(): Observable<RentalResponse> {
    return this.httpClient.get<RentalResponse>(this.apiUrl);
  }
}
