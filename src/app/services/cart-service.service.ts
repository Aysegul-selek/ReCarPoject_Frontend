import { Injectable } from '@angular/core';
import { CarDetail } from '../models/car-detail';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  constructor() { }
  addTocart(carDetail:CarDetail){
    let item=CartItems.find(c=>c.carDetail.carId===carDetail.carId);
     if (item) {
      item.quantity+=1;
     }else{
      let cartItem=new CartItem();
      cartItem.carDetail=carDetail;
      cartItem.quantity=1;
      CartItems.push(cartItem)
     }
    }
    list():CartItem[]{
      return CartItems;
    }
    removeCart(carDetail:CarDetail){
      let item=CartItems.find(c=>c.carDetail.carId===carDetail.carId);
      CartItems.splice(CartItems.indexOf(item),1);
      
      }
}
