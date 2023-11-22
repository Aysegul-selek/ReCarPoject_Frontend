import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponse } from '../models/carResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44324/api/Cars/getall';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<CarResponse> {
    return this.httpClient.get<CarResponse>(this.apiUrl);
  }
}
