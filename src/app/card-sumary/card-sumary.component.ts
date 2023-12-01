import { Component } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CarDetail } from '../models/car-detail';
import { CreditCartService } from '../services/credit-cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-sumary',
  templateUrl: './card-sumary.component.html',
  styleUrls: ['./card-sumary.component.css']
})
export class CardSumaryComponent {
  cartItems:CartItem[]=[];
  itemLoaded :boolean;
  currentCart:CartItem;


  constructor(private cartService:CreditCartService, private toastrService:ToastrService){}
  ngOnInit(): void {
    this.getCart();
  }
  getCart(){
    this.cartItems = this.cartService.list();
  }
  removeFromCart(cardetail:CarDetail){
    this.cartService.removeFromCart(cardetail);
    this.toastrService.error(cardetail.brandName+" "+cardetail.carName +" "+"Sepetten Silindi","",{
      progressBar:true
    })
  }

  setCurrentCart(cartItems:CartItem){
    this.currentCart = cartItems;
  }
}
