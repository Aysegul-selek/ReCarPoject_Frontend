import { Component } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarDetailService } from '../services/car-detail.service';
import { CarDetail } from '../models/car-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  carDetails: CarDetail[] = [];
  baseUrl="https://localhost:44324/uploads/images/";


  constructor(private carService: CarService, private router: Router, private carDetailService:CarDetailService) {}

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(){
    this.carDetailService.getAllCars().subscribe(response=>{
     this.carDetails = response.data
    })
   }
}
