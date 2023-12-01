import { Component } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';
import { CarDetail } from '../models/car-detail';
import { ActivatedRoute } from '@angular/router';
import { CarDetailService } from '../services/car-detail.service';
import { CarImageService } from '../services/car-image.service';
import { CarImageDetail } from '../models/carImageDetail';
import { Brand } from '../models/brand';
import { Color } from '../models/color';
import { BrandService } from '../services/brand.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  cars: Car[] = [];
  brands:Brand[]=[];
  colors:Color[]=[];
  carDetails: CarDetail[]=[];
  carImages: CarImageDetail[]=[];
  filterText="";
  imageOfPath:string;
  filterBrand:number;
  filterColor:number;
  baseUrl = 'https://localhost:44324/uploads/images/';
  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private colorService:ColorService,
    private carDetailService:CarDetailService,
    private carImageService:CarImageService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"])
      {
        this.getCarsByBrand(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{
        this.getCars();
        this.getBrands();
        this.getColors();

      }
    })
  }

  getCars() {
    this.carDetailService.getAllCars().subscribe((response) => {
      this.carDetails = response.data;
    });
  }
  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors=response.data;
    })
  }
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrands(brandId).subscribe(response=>{
      this.carDetails=response.data
    })
  };
  getCarsByColor(ColorId:number){
    this.carService.getCarsByColorId(ColorId).subscribe(response=>{
      this.carDetails=response.data
    })
  };
  getCarImageByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      const imagePath=response.data[2].file;
      this.imageOfPath = this.baseUrl+imagePath;
    })
    return this.imageOfPath;
  }
  getCarsByBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarsByBrandAndColor(brandId,colorId).subscribe(response=>{
      this.carDetails=response.data;
      console.log(response.data)
    })
  }
}
