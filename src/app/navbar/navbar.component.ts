import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logedSubscribe = new Subscription();
  userNameSubscribe = new Subscription();
  userLogged: boolean = false;
  userName: string = '';
  noOfItemInCart: number = 0;

  constructor(private _AuthService: AuthService, private _CartService: CartService) { }


  ngOnInit(): void {
    this._CartService.cartProductCount.subscribe({
      next: (val) => this.noOfItemInCart = val
    });
    
    this._CartService.getCartProductCount().subscribe({
      next: (response) => {
        this._CartService.cartProductCount.next(response.numOfCartItems);
      }
    });

    this.logedSubscribe = this._AuthService.userLogedIn.subscribe({
      next: (value) => { this.userLogged = value }
    })
    this.userNameSubscribe = this._AuthService.userName.subscribe({
      next: (value) => {
        this.userName = value; console.log(this.userName);
      }
    })
  }
  logOut() {
    this._AuthService.logOut();
  }
  ngOnDestroy(): void {
    // this.logedSubscribe.unsubscribe();
    // this.userNameSubscribe.unsubscribe();
  }
}
