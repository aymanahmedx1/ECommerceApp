import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../service/product.service';
import { Category, Product } from '../interface/product';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../service/wish-list.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  allCategories: Category[] = [];
  wishList: string[] = [];
  productSubscription = new Subscription();
  categoriesSubscription = new Subscription();
  constructor(private _WishListService: WishListService, private _productService: ProductService, private toastr: ToastrService, private _CartService: CartService) { }
  check(id: string): boolean {
    return this.wishList.includes(id);
  }
  ngOnInit(): void {
    this.getWighList();
    this.getCategories();
    this.getProducts();
  }
  getWighList() {
    this._WishListService.getWishList().subscribe({
      next: (response) => {
        let wishList: Product[] = response.data;
        for (const p of wishList) {
          this.wishList.push(p._id);
        }
      },
      error: (error) => { }
    })
  }
  getCategories() {
    this.categoriesSubscription = this._productService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (error) => { }
    })
  }
  getProducts() {
    this.productSubscription = this._productService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
  }
  addToCart(productID: string) {
    this._CartService.addToCart(productID).subscribe({
      next: (response) => {
        if (response.status === "success") {
          this._CartService.cartProductCount.next(response.numOfCartItems);
          this.showSuccess("'Product Add To Cart Success'");
        }
      },
      error: (err) => { },
    });
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }

  addToWishList(productID: string) {
    this._WishListService.addToWishList(productID).subscribe(
      {
        next: (response) => {
          if (response.status === "success") {
            this.showSuccess("Add to WishList");
            this.getWighList();
            this.getProducts();
          }

        },
        error: (err) => {
          console.log(err);

        }
      }
    );
  }
}
