import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
import { AddForRental } from '../models/addForRental';
import { Payment } from '../models/payment';
import { PaymentService } from './payment.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  constructor(private httpClient: HttpClient, private paymentService: PaymentService,
    private toastrService: ToastrService) {}
  apiUrl = 'https://localhost:44324/api/';

  getCheckRentalCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath =this.apiUrl+"rentals/checkrentalcarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  addRental(addForRental:Rental){
    return this.httpClient.post<ResponseModel>(this.apiUrl +"rentals/add",addForRental);
  }
  payAndRent(payment: Payment, rent: Rental) {
    this.paymentService.pay(payment).subscribe(
      (response) => {
        console.log(rent);
        this.addRental(rent).subscribe(
          (rentResponse) => {
            this.toastrService.success(rentResponse.message);
          },
          (rentResponseError) => {
            this.toastrService.error(rentResponseError.error.message);
          }
        );
        this.toastrService.success(response.message);
      },
      (responseError) => {
        this.toastrService.error(responseError.error.message);
      }
    );
  }
}
