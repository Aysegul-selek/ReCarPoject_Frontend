import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = 'https://localhost:44324/api/';
  constructor(private httpClient: HttpClient) { }
   getRentals(): Observable<ListResponseModel<Rental>> {
    let path=this.apiUrl+"Rentals/getall"
    return this.httpClient.get<ListResponseModel<Rental>>(path);
  }
}
