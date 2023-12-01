import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddForCreditCard } from '../models/addForCreditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';
import { CarDetail } from '../models/car-detail';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {
  apiUrl = 'https://localhost:44324/api/';
  constructor(
    private toastrService:ToastrService,
    private httpClient:HttpClient
    ) { }

  addToCart(cardetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId===cardetail.carId);
    if(item){
      item.quantity+=1;
      item.totalamount=(item.carDetail.dailyPrice)*(item.quantity)
    }else{
      let cartItem = new CartItem();
      cartItem.carDetail = cardetail;
      cartItem.quantity = 1;
      cartItem.totalamount = cartItem.carDetail.dailyPrice;
      CartItems.push(cartItem);
    }
  }

  removeFromCart(cardetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId===cardetail.carId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }

  getCarDetails(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl + "Cars/getcardetailsid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

}
