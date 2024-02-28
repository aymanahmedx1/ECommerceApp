import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { Category, subcategory } from '../interface/product';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit ,OnDestroy{
  allCategorySuscribtion = new Subscription();
  allSubCategorySubscription = new Subscription();
  allCategories: Category[] = [];
  allSunCategories: subcategory[] = [];
  selectedCategory: string = '';
  constructor(private _ProductService: ProductService ,private _ViewportScroller:ViewportScroller) {

  }
  ngOnDestroy(): void {
    this.allCategorySuscribtion.unsubscribe();
    this.allSubCategorySubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.allCategorySuscribtion = this._ProductService.getAllCategories().subscribe({
      next: (respnse) => {
        this.allCategories = respnse.data;
      },
      error: (err) => { }
    })
  }


  selectCategory(category: Category) {
    this.selectedCategory = category.name;
    this.allSubCategorySubscription = this._ProductService.getCategoySubCategories(category._id).subscribe({
      next: (respnse) => {
        this.allSunCategories = respnse.data;
        this._ViewportScroller.scrollToAnchor("subCategoryArea")
      },
      error: (err) => { }
    })
  }
}
