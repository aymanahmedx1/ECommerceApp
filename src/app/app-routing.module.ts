import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SginUpComponent } from './sgin-up/sgin-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { CartComponent } from './cart/cart.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';

const routes: Routes = [
  {path:"" ,redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent , title:"Home"},
  {path:"brands",component:BrandsComponent , title:"Brands"},
  {path:"cart",component:CartComponent , title:"Cart"},
  {path:"wishList",component:WishListComponent , title:"WishList"},
  {path:"categories",component:CategoriesComponent , title:"Categories"},
  {path:"products",component:ProductsComponent , title:"Products"},
  {path:"logIn",component:LogInComponent , title:"Log In"},
  {path:"signUp",component:SginUpComponent , title:"SignUp"},
  {path:"**",component:NotFoundComponent , title:"404 NotFound"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
