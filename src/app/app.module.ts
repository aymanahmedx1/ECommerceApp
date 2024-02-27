import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { SginUpComponent } from './sgin-up/sgin-up.component';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './slider/slider.component';
import { ProductDetailsComponent } from './product-details/product-details.component'
import { HeaderInterceptor } from './header.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LogInComponent,
    SginUpComponent,
    CartComponent,
    WishListComponent,
    ProductsComponent,
    CategoriesComponent,
    BrandsComponent,
    NotFoundComponent,
    SliderComponent,
    ProductDetailsComponent,
    OrderComponent,
    AllOrdersComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
