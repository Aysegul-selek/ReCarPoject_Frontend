import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NaviComponent } from './navi/navi.component';
import { BrandComponent } from './brand/brand.component';
import { CarComponent } from './car/car.component';
import { RentalComponent } from './rental/rental.component';
import { ColorComponent } from './color/color.component';
import { CustomerComponent } from './customer/customer.component';
import { FooterComponent } from './footer/footer.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaymentComponent } from './payment/payment.component';
import { CardSumaryComponent } from './card-sumary/card-sumary.component';
import { BrandAddComponent } from './brand-add/brand-add.component';
import { ColorAddComponent } from './color-add/color-add.component';
import { CarAddComponent } from './car-add/car-add.component';
import { CarListComponent } from './car-list/car-list.component';
import { ColorListComponent } from './color-list/color-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandUpdateComponent } from './brand-update/brand-update.component';
import { ColorUpdateComponent } from './color-update/color-update.component';
import { CarUpdateComponent } from './car-update/car-update.component';
import { CarDeleteComponent } from './car-delete/car-delete.component';
import { ColorDeleteComponent } from './color-delete/color-delete.component';
import { BrandDeleteComponent } from './brand-delete/brand-delete.component';
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    CarComponent,
    RentalComponent,
    ColorComponent,
    CustomerComponent,
    FooterComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterColorPipe,
    FilterCarPipe,
    PaymentComponent,
    CardSumaryComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarListComponent,
    ColorListComponent,
    BrandListComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    ColorDeleteComponent,
    BrandDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        positionClass:"toast-bottom-right"
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
