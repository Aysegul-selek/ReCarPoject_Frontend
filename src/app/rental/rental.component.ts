import { Component } from '@angular/core';
import { Rental } from '../models/rental';
import { RentalService } from '../services/rental.service';
import { CarDetail } from '../models/car-detail';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetailService } from '../services/car-detail.service';
import { CreditCartService } from '../services/credit-cart.service';
import { CarImageService } from '../services/car-image.service';
import { CarImageDetail } from '../models/carImageDetail';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent {
  images: CarImageDetail[] = [];
  image:CarImageDetail[];
  currentImage: any;
  cartItems:CartItem[]=[];
  carDetail:CarDetail[]=[];
  payamount:CartItem[]=[];
  imageUrl = 'https://localhost:44324/uploads/images/';

  constructor(private cardetailService:CarDetailService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private carImageService:CarImageService,
    private cartService:CreditCartService,
    private toastrService:ToastrService
    ){}

  ngOnInit(): void {this.activatedRoute.params.subscribe((params) => {
    if (params["carId"]) {
      this.getImageByCar(params["carId"])
      
    }
  })
    this.getCart();
  }

  getImageByCar(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe(
      (value: { data: CarImageDetail[] } | any) => {
        if (Array.isArray(value.data)) {
          this.images = value.data;
        } else if (typeof value.data === 'object' && value.data !== null && 'file' in value.data) {
          
          this.images = [value.data];
        } else {
          console.error("Invalid data format:", value.data);
        }
  
        // Daha sonra currentImage'ı ayarla
        this.currentImage = this.getImagePath(this.images[0]?.file);
      },
      (error: any) => {
        console.error("Error while fetching car images:", error);
      }
    );
  }
  
  getImagePath(file: string | undefined) {
    return file ? 'https://localhost:44324/uploads/images/' + file : '';
  }
  
  getCarDetails(carId:number){
    this.carService.getCarsDetailsId(carId).subscribe(response=>{
      this.carDetail = response.data
    })
  }

  getCart(){
    this.cartItems = this.cartService.list();
  }

  totalpay(cardetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId===cardetail.carId);
    if(item){
      item.payamount+=item.carDetail.dailyPrice
    }else{
      let cartItem = new CartItem();
      cartItem.payamount= cartItem.totalamount;
    }

  }

  removeFromCart(cardetail:CarDetail){
    this.cartService.removeFromCart(cardetail);
    this.toastrService.error(cardetail.brandName+" "+cardetail.carName +" "+"Sepetten Silindi","",{
      progressBar:true
    })
  }

  gotopay(){
    this.toastrService.info("Ödeme sayfasına yönlendirildiniz","",{
      progressBar:true
    })
  }
}
