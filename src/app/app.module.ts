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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
