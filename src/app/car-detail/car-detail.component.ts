import { Component } from '@angular/core';
import { CarDetail } from '../models/car-detail';
import { Car } from '../models/car';
import { CarImageDetail } from '../models/carImageDetail';
import { CarService } from '../services/car.service';
import { CarDetailService } from '../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from '../services/car-image.service';
import { RentalService } from '../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../services/cart-service.service';
import { Rental } from '../models/rental';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent {
  [x: string]: any;
  imageUrl = 'https://localhost:44324/uploads/images/';
  cars:Car[]=[];
  carDetails: CarDetail[]=[];
  images: CarImageDetail[] = [];
  image:CarImageDetail[];
  currentImage: any;
  currentIndex: number = 0;
  filterText="";
  rentalMessage: string = '';
  rentDate : Date | null = null;
  returnDate : Date | null = null;
  constructor(private carService: CarService,
     private activatedRoute: ActivatedRoute,
     private carImageService:CarImageService,
    private carDetailService:CarDetailService,
    private rentalSerivce:RentalService,
    private cartService:CartServiceService,
    private toastrService:ToastrService) {
  }

  getCarsById(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe(result => {
      this.carDetails = result.data;
    })
  }
 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.getCarsById(params["carId"])
        this.getImageByCar(params["carId"])
        
      }
    })
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
  
  
  

  nextImage() {
    if (this.currentIndex + 1 <= this.images.length - 1)
      this.currentIndex += 1;
    else
      this.currentIndex = 0;
    this.currentImage = this.images[this.currentIndex]
  }

  prevImage() {
    if (this.currentIndex - 1 >= 0)
      this.currentIndex -= 1;
    else if (this.currentIndex - 1 < 0)
      this.currentIndex = this.images.length - 1;
    this.currentImage = this.images[this.currentIndex]
  }

  addToCart(carDetail:CarDetail){

    if(carDetail.carId===1){
      this.toastrService.error("Araç sepete eklenemedi", "Araç başkası tarafından kiralanmış durumda",{
        progressBar:true
      })
    }else{
   
      this.cartService.addTocart(carDetail);
      this.toastrService.success("Araç sepete eklendi",carDetail.brandName+" "+carDetail.carName,{
        progressBar:true
      })
    }
  }

  
}
