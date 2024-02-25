import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../service/product.service';
import { Category, Product } from '../interface/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  allCategories: Category[] = [];
  productSubscription = new Subscription();
  categoriesSubscription = new Subscription();
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this._productService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (error) => { }
    })
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
}
