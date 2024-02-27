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
import { authGuard } from './guard/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  {path:"" ,redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent , title:"Home" , canActivate:[authGuard]},
  {path:"brands",component:BrandsComponent , title:"Brands", canActivate:[authGuard]},
  {path:"cart",component:CartComponent , title:"Cart", canActivate:[authGuard]},
  {path:"wishList",component:WishListComponent , title:"WishList", canActivate:[authGuard]},
  {path:"categories",component:CategoriesComponent , title:"Categories", canActivate:[authGuard]},
  {path:"products",component:ProductsComponent , title:"Products", canActivate:[authGuard]},
  {path:"productDetails/:id",component:ProductDetailsComponent , title:"Product Details", canActivate:[authGuard]},
  {path:"logIn",component:LogInComponent , title:"Log In"},
  {path:"signUp",component:SginUpComponent , title:"SignUp"},
  {path:"order/:cartID",component:OrderComponent , title:"Check Out"},
  {path:"allorders",component:AllOrdersComponent , title:"All Orders"},
  {path:"**",component:NotFoundComponent , title:"404 NotFound"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
