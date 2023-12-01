import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../models/brand';
import { BrandService } from '../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent {
  brandDeleteForm: FormGroup = new FormGroup({});
  brand: Brand | null = null;
  brands: Brand[] = [];
  brandId!: number;
  brandName: string | null = null;

  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getBrandById(params['brandId']);
      this.createBrandForm();
    });
  }

  getBrandById(id: number) {
    this.brandService.getBrandById(id).subscribe((response) => {
      this.brand = response.data;
      this.brandId = this.brand.brandId;
      this.brandName = this.brand.brandName;
    });
  }

  createBrandForm() {
    this.brandDeleteForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      brandName: ['', Validators.required]
    });
  }

  delete() {
    if (this.brandDeleteForm.valid) {
      let brandModel = Object.assign({}, this.brandDeleteForm.value);
      console.log(brandModel);
      this.brandService.delete(brandModel).subscribe(
        (response) => {
          this.toastrService.success('Renk silindi', 'Başarılı');
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
      this.toastrService.error('Formunuz eksik', 'Dikkat!');
    }
  }

  backToBrandList() {
    this.router.navigate(['brand/list']);
  }
}
