import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImageDetail } from '../models/carImageDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { CarDetail } from '../models/car-detail';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = 'https://localhost:44324/api/';
  constructor(private httpClient: HttpClient) {}

  getCarImages():Observable<ListResponseModel<CarImageDetail>>{
    let newPath=this.apiUrl +"CarImages/getall";
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(newPath);
  }

  getCarImagesByCarId(carId: number): Observable<ListResponseModel<CarImageDetail>> {
    let newPath = this.apiUrl + 'CarImage/getbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(newPath);
  }
 
  getCarImagesById(imageId:number):Observable<ListResponseModel<CarImageDetail>>{
    let newPath=this.apiUrl+"CarImages/getbyid?id=" + imageId;
    return this.httpClient.get<ListResponseModel<CarImageDetail>>(newPath);
  }
}
