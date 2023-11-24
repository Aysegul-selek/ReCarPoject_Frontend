import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44324/api/';
  constructor(private httpClient: HttpClient) {}
  getCars(): Observable<ListResponseModel<Car>> {
    let path=this.apiUrl+"Cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(path);
  }
  getCarsByBrands(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"Cars/branddetail?="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
