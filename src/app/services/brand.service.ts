import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandResponse } from '../models/brandResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = 'https://localhost:44324/api/Brands/getall';
  constructor(private httpClient: HttpClient) { }
   getBrands(): Observable<BrandResponse> {
    return this.httpClient.get<BrandResponse>(this.apiUrl);
  }
}
