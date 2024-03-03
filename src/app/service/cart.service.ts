import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProductCount = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {
    this.getCartProductCount().subscribe({
      next: (response) => {
        this.cartProductCount.next(response.numOfCartItems);
      },
      error: (error) => { }
    });
  }
  getUserCart(): Observable<any> {
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart");
  }
  addToCart(productID: string): Observable<any> {
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: productID });
  }
  getCartProductCount(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart');
  }
  cartCheckOut() {

  }
  changCartItemQty(productID: string, updatedQty: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, { 'count': updatedQty });
  }
  deleteItemFromCart(productID: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`);
  }
  createOrder(address: any, cartID: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=http://localhost:4200`, { shippingAddress: address });
  }
  getAllOrders(userID:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`);
  }
}
