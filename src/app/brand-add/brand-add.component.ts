import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from '../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent {
  brandAddForm:FormGroup;
  constructor(private formsBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService, private router: Router){}
ngOnInit():void{
  this.createBrandAddForm();
}
createBrandAddForm() {
  this.brandAddForm = this.formsBuilder.group({
    brandName: ["", Validators.required],
  })
}
brandAdd() {
  if (this.brandAddForm.valid) {
    let brandModel = Object.assign({}, this.brandAddForm.value);
    this.brandService.add(brandModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.backToBrandList();
      },
      (responseError) => {
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'İşlem Başarısız'
            );
          }
        }
      }
    );
  } else {
    this.toastrService.error('Formunuz eksik', 'Dikkat!!!!');
  }
}

backToBrandList() {
  this.router.navigate(['brands/list']);
}
}
