import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Subscription } from 'rxjs';
import { Cart } from '../interface/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit ,OnDestroy {
  getUserCartSubscription = new Subscription();
  changeCartQtySubscription = new Subscription();
  deleteItemSubscription = new Subscription();
  cartID:string="";
  constructor(private _CartService: CartService , private toastr:ToastrService) { }
  cartItems: Cart[] = []
  totalCartPrice:number=0 ; 
  ngOnInit(): void {
    this.getUserCartSubscription = this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.data.products;
        this.totalCartPrice= response.data.totalCartPrice ; 
        this.cartID = response.data._id
        
      },
      error: (error) => {
        console.log(error);
      },
    })
  }
  changeItemQty(productID:string , updatedQty:number){
    this.changeCartQtySubscription =  this._CartService.changCartItemQty(productID,updatedQty).subscribe({
      next:(response)=>{
        this.cartItems = response.data.products;
        this.totalCartPrice= response.data.totalCartPrice ; 
        this.cartID = response.data._id
        this.showSuccess();
      },
      error:(error)=>{
        console.log(error);
        
      },
    })
  }
  deleteCartItem(productID:string){
    this.deleteItemSubscription =  this._CartService.deleteItemFromCart(productID).subscribe({
      next:(response)=>{
        this.cartItems = response.data.products;
        this.totalCartPrice= response.data.totalCartPrice ; 
        this.showDelete();
      },
      error:(error)=>{
        console.log(error);
      },
    })
  }
  showSuccess() {
    this.toastr.info( 'Product Count Updated');
  }
  showDelete() {
    this.toastr.error( 'Product Deleted');
  }


  ngOnDestroy(): void {
    this.getUserCartSubscription.unsubscribe();
    this.changeCartQtySubscription.unsubscribe();
    this.deleteItemSubscription.unsubscribe();
  }
}
