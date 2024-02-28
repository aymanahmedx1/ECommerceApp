import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';
import { Brand } from '../interface/product';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnDestroy {
  brandsSubscription = new Subscription();
  allBrands: Brand[] = [];
  title: string = '';
  image: string = '';
  createdAt: Date = new Date();
  constructor(private _ProductService: ProductService) {
  }

  ngOnInit(): void {
    this.brandsSubscription = this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.allBrands = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  openBrandModal(brand: Brand) {
    this.title = brand.name;
    this.image = brand.image;
    this.createdAt = brand.createdAt;
  }

  ngOnDestroy(): void {
    this.brandsSubscription.unsubscribe();
  }
}
