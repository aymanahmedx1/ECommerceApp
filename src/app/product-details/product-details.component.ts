import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product, ProductDetails } from '../interface/product';
import { ProductService } from '../service/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../service/wish-list.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit ,OnDestroy {
  productSubscribtion = new Subscription();
  wishListSubscription = new Subscription();
  product: any =null;
  productInWhishList:boolean=false;  
  constructor( private _WishListService:WishListService, private toastr: ToastrService,private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService ,  private _CartService:CartService) {

  }
 

  addToCart(productID:string){
    this._CartService.addToCart(productID).subscribe({
      next:(response)=>{
        if(response.status ==="success"){
          this._CartService.cartProductCount.next(response.numOfCartItems);
          this.showSuccess('Product Add To Cart Success');
        }
      },
      error:(err)=>{},
    });
  }
  getWighList() {
    this.wishListSubscription =  this._WishListService.getWishList().subscribe({
      next: (response) => {
        let wishList: Product[] = response.data;
        for (const p of wishList) {      
          if(p._id === this.product._id){
            this.productInWhishList = true ;             
          }
        }
      },
      error: (error) => { console.log(error);
      }
    })
  }
  addToWishList(productID: string) {
    this._WishListService.addToWishList(productID).subscribe(
      {
        next: (response) => {
          if (response.status === "success") {
            this.getWighList();
            this.showSuccess("Add To Wishlist Success")
          }

        },
        error: (err) => {
          console.log(err);

        }
      }
    );
  }
  showSuccess(message:string) {
    this.toastr.success();
  }
  ngOnInit(): void {
    let productID = this._ActivatedRoute.snapshot.params['id'];
    this.productSubscribtion = this._ProductService.getProductDetails(productID).subscribe(
      {
        next: (response) => {
          this.product = response.data;
        },
        error: (error) => { },
      }
    )
    ;
    this.getWighList();

  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoWidth:true , 
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  ngOnDestroy(): void {
    this.productSubscribtion.unsubscribe();
    this.wishListSubscription.unsubscribe();
  }
}
