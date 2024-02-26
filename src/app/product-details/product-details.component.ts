import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductDetails } from '../interface/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productSubscribtion = new Subscription();
  product: any;
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService) {

  }
  ngOnInit(): void {
    let productID = this._ActivatedRoute.snapshot.params['id'];
    this.productSubscribtion = this._ProductService.getProductDetails(productID).subscribe(
      {
        next: (response) => {
          console.log(response.data);
          this.product = response.data;
        },
        error: (error) => { },
      }
    )

  }

}
