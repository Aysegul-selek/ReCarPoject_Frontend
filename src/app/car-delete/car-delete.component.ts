import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../services/car.service';
import { Car } from '../models/car';
import { CarDetail } from '../models/car-detail';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent {
  carDeleteForm: FormGroup = new FormGroup({});

  carDetails: CarDetail[] = [];
  cars: Car[] = [];  

  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarsDetailsId(params['carId']);
      this.createCarForm();
      this.carDeleteForm.patchValue({ id: params['carId'] });
      this.getCarsById(params['carId']);
    });
  }

  getCarsDetailsId(carId: number) {
    this.carService.getCarsDetailsId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarsById(carId: number) {
    this.carService.getCarsById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  createCarForm() {
    this.carDeleteForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['0', Validators.required],
      colorId: ['0', Validators.required],
      modelYear: ['0', Validators.required],
      dailyPrice: ['0', Validators.required],
      description: ['0', Validators.required],
    });
  }

  delete() {
    if (this.carDeleteForm.valid) {
      let carModel = Object.assign({}, this.carDeleteForm.value);
      console.log(carModel);
      this.carService.delete(carModel).subscribe(
        (response) => {
          this.toastrService.success('Araç Silindi', 'İşlem Başarılı');
          this.backToCarList();
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'İşlem Başarısız'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat!');
    }
  }

  backToCarList() {
    this.router.navigate(['car/list']);
  }
}
