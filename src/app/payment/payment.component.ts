import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/rental';
import { PaymentService } from '../services/payment.service';
import { Customer } from '../models/customer';
import { LocalStorageService } from '../services/local-storage.service';
import { Payment } from '../models/payment';
import { RentKey } from '../models/constants/local-storage-key';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  payFormGroup: FormGroup;
  customer:Customer;

  constructor(private paymentService:PaymentService,
    private toastrService:ToastrService,
    private rentService:RentalService,
    private formBuilder:FormBuilder,
    private localStorageService:LocalStorageService
    ){}

  ngOnInit(): void {
    this.createPayFormGroup();
  }

  createPayFormGroup(){
    this.payFormGroup = this.formBuilder.group({
      fullName: ["", Validators.required],
      cardNumber: ['', Validators.required],
      expiryMonth: ['', Validators.required],
      expiryYear: ['', Validators.required],
      cvv: ['', Validators.required]
    })
  }

  pay(){
    if (this.payFormGroup.valid) {

      this.toastrService.success("Ödeme başarılı","",{
        progressBar:true
      })
      let rent: Rental = this.localStorageService.get(RentKey)
      let payment: Payment = Object.assign({

        customerId: rent.customerId
      }, this.payFormGroup.value);
      this.askForSave(payment);
      this.rentService.payAndRent(payment, rent)


    }else this.toastrService.error("başarısız")
  }

  askForSave(payment:Payment){
    this.paymentService.checkIfThisCardIsAlreadySavedForThisCustomer(payment).subscribe(response=>{
      if (confirm("Ödeme bilginiz kaydedilsin mi?")) this.paymentService.add(payment)
    })
  }

  getAllByCustomerId() {
    if (this && this.customer && this.customer.customerId) {
    } else {
      console.error('Customer or customerId is undefined.');
    }
  }
}
