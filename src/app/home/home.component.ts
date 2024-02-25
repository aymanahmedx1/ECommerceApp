import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../service/product.service';
import { Product } from '../intrface/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  productSubscription = new Subscription();
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.productSubscription = this._productService.getAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      },
      error: (error) => { console.log(error);
      },
    })
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}
