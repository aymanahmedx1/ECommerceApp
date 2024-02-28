import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishListService } from '../service/wish-list.service';
import { Product } from '../interface/product';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit , OnDestroy {
  wishList: Product[] = [];
  addToCartSubscription = new Subscription();
  removeSubscription = new Subscription();
  getWishListSubscription = new Subscription();
  constructor(private _WishListService: WishListService , private _CartService:CartService , private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.getWishList();
  }
  getWishList(){
    this.getWishListSubscription =  this._WishListService.getWishList().subscribe(
      {
        next: (response) => { this.wishList = response.data },
        error: (err) => { }
      }
    )
  }
  addToCart(productID:string){
    this.addToCartSubscription =  this._CartService.addToCart(productID).subscribe({
      next:(response)=>{
        if(response.status ==="success"){
          this._CartService.cartProductCount.next(response.numOfCartItems);
          this.showSuccess();
        }
      },
      error:(err)=>{},
    });
  }
  removeFromList(productID:string){
  this.removeSubscription =   this._WishListService.removeProduct(productID).subscribe({
      next:(response)=>{        
        if(response.status ==="success"){
          this.getWishList();
          this.showDeleted();
        }
      },
      error:(err)=>{
        console.log(err);
      },
    });
  }

  showSuccess() {
    this.toastr.success( 'Product Add To Cart Success',"Add To Cart");
  }
  showDeleted() {
    this.toastr.error( 'Product Deleted');
  }
  ngOnDestroy(): void {
    this.removeSubscription.unsubscribe();
    this.addToCartSubscription.unsubscribe();
    this.getWishListSubscription.unsubscribe();
  }
}
