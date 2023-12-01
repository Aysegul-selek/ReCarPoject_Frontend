import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44324/api/';
  constructor(private httpClient: HttpClient) { }
  getColors(): Observable<ListResponseModel<Color>> {
    let path=this.apiUrl+"Colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(path);
  }
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"colors/add",color)
  }
  delete(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/delete';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }

  update(color: Color): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'colors/update';
    return this.httpClient.post<ResponseModel>(newPath, color);
  }
  getColorById(id: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
}
