import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

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
}
