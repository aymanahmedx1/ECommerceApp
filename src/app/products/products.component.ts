import { Component } from '@angular/core';
import { Category, Product } from '../interface/product';
import { Subscription } from 'rxjs';
import { WishListService } from '../service/wish-list.service';
import { ProductService } from '../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  allProducts: Product[] = [];
  allCategories: Category[] = [];
  wishList: string[] = [];
  productSubscription = new Subscription();
  categoriesSubscription = new Subscription();
  wishListSubscription = new Subscription();
  constructor(private _WishListService: WishListService, private _productService: ProductService, private toastr: ToastrService, private _CartService: CartService) { }
  ngOnInit(): void {
    this.getWighList();
    this.getCategories();
    this.getProducts();
  }
  getWighList() {
    this.wishListSubscription =  this._WishListService.getWishList().subscribe({
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
            this.getWighList();
            this.showSuccess("Add to WishList");
          }
        },
        error: (err) => {
          console.log(err);

        }
      }
    );
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.categoriesSubscription.unsubscribe();
    this.wishListSubscription.unsubscribe();
  }
}
