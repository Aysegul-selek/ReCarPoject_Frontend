import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car/car.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { RentalComponent } from './rental/rental.component';
import { PaymentComponent } from './payment/payment.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { ColorAddComponent } from './color-add/color-add.component';
import { CarAddComponent } from './car-add/car-add.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { ColorListComponent } from './color-list/color-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { BrandUpdateComponent } from './brand-update/brand-update.component';
import { BrandDeleteComponent } from './brand-delete/brand-delete.component';
import { ColorUpdateComponent } from './color-update/color-update.component';
import { ColorDeleteComponent } from './color-delete/color-delete.component';
import { CarUpdateComponent } from './car-update/car-update.component';
import { CarDeleteComponent } from './car-delete/car-delete.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/car/:carId', component: CarDetailComponent },
  {path: "rentals/car/:carId", component: RentalComponent},
  {path: "payment", component: PaymentComponent},


  {path:"brands/list/add",component:BrandAddComponent},
  { path: 'brand/list', component: BrandListComponent },
  { path: 'brand/list/update/:brandId', component: BrandUpdateComponent },
  { path: 'brand/list/delete/:brandId', component: BrandDeleteComponent },


  {path:"color/list/add",component:ColorAddComponent},
  { path: 'color/list', component: ColorListComponent },
  { path: 'color/list/update/:colorId', component: ColorUpdateComponent },
  { path: 'color/list/delete/:colorId', component: ColorDeleteComponent },


  {path:"car/list/add",component:CarAddComponent},
  { path: 'car/list', component: CarListComponent },
  { path: 'car/list/update/:carId', component: CarUpdateComponent },
  { path: 'car/list/delete/:carId', component: CarDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
