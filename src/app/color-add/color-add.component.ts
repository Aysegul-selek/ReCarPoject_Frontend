import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ColorService } from '../services/color.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent {
  colorAddForm:FormGroup;
  constructor(private formsBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService, private router: Router){}
ngOnInit():void{
  this.createColorAddForm();
}
createColorAddForm() {
  this.colorAddForm = this.formsBuilder.group({
    colorName: ["", Validators.required],
  })
} colorAdd() {
  if (this.colorAddForm.valid) {
    let colorModel = Object.assign({}, this.colorAddForm.value);
    this.colorService.add(colorModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.backToColorList();
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

backToColorList() {
  this.router.navigate(['color/list']);
}
}

