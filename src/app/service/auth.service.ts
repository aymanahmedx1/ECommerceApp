import { Injectable } from '@angular/core';
import { SignUpData } from '../interface/sign-up-data';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLogedIn = new BehaviorSubject(false);
  userName = new BehaviorSubject("");
  constructor(private _HttpClient: HttpClient, private _Router: Router , private _CartService:CartService) {
    let token = localStorage.getItem("token");
    if (token) {
      this.userLogedIn.next(true) ; 
      let decodedToken = this.decodeToken(token) ; 
      this.userName.next(decodedToken.name) ;
    }    
  }
  decodeToken(token:any):any{
    const decoded = jwtDecode(token);
    return decoded;
  }

  getUserCartItemCount(){
    this._CartService.getCartProductCount().subscribe({
      next: (response) => {
        this._CartService.cartProductCount.next(response.numOfCartItems);
      },
      error: (error) => { }
    });
  }

  signUp(userData: SignUpData): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
  }
  logIn(loginData: any): Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginData);
  }
  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    this.userLogedIn.next(false);
    this._Router.navigate(["logIn"]);
    this._CartService.cartProductCount.next(0);
  }
  sendRestPasswordCode(data:any): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data);
  }
  verfiyCode(data:any): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data);
  }
  changePassword(data:any): Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data);
  }
  updatePassword(data:any):Observable<any>{
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', data);
  }
}


