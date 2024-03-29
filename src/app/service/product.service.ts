import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClint: HttpClient) { }
  getAllProducts():Observable<any>{
    return this._HttpClint.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  getAllCategories():Observable<any>{
    return this._HttpClint.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  getCategoySubCategories(categoryID:string):Observable<any>{
    return this._HttpClint.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryID}/subcategories`);
  }
  getProductDetails(id:string):Observable<any>{
    return this._HttpClint.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  getAllBrands():Observable<any>{
    return this._HttpClint.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
}
