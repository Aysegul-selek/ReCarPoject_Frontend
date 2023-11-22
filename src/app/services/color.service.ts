import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ColorResponse } from '../models/colorResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = 'https://localhost:44324/api/Colors/getall';
  constructor(private httpClient: HttpClient) { }
  getColors(): Observable<ColorResponse> {
    return this.httpClient.get<ColorResponse>(this.apiUrl);
  }
}
