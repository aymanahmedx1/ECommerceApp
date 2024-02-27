import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDetails } from '../interface/product';
import { ProductService } from '../service/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productSubscribtion = new Subscription();
  product: any =null;
  constructor(private toastr: ToastrService,private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService ,  private _CartService:CartService) {

  }

  addToCart(productID:string){
    this._CartService.addToCart(productID).subscribe({
      next:(response)=>{
        if(response.status ==="success"){
          this._CartService.cartProductCount.next(response.numOfCartItems);
          this.showSuccess();
        }
      },
      error:(err)=>{},
    });
  }
  
  showSuccess() {
    this.toastr.success( 'Product Add To Cart Success',"Add To Cart");
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

}
