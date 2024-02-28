import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../service/product.service';
import { Category } from '../interface/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy{
  allCategories: Category[] = [];
  categoriesSubscription = new Subscription();
  constructor( private _productService: ProductService) { }
  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.categoriesSubscription = this._productService.getAllCategories().subscribe({
      next: (response) => {
        this.allCategories = response.data;
      },
      error: (error) => { }
    })
  }
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }



}
