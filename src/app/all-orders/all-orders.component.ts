import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../service/cart.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  constructor(private _CartService: CartService) { }
  allOrders: Order[] = [];
  selectedOrder:any;  


  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let decoded = this.decodeToken(token);
    this._CartService.getAllOrders(decoded.id).subscribe({
      next: (response) => {
        console.log(response);
        let orders:Order[] = response;
        this.allOrders = orders.sort((n1, n2) => {
          const n1Created = new Date(n1.createdAt)
          const n2Created = new Date(n2.createdAt)
          if (n1Created > n2Created) {
            return -1;
          }
          
          if (n1Created < n2Created) {
            return 1;
          }
          
          return 0;
        });
        this.selectedOrder = this.allOrders[0];
      },
      error: (err) => {
        console.log(err);
      },
    })

  }

  decodeToken(token: any): any {
    const decoded = jwtDecode(token);
    return decoded;
  }

  selectOrder(order:any){
    this.selectOrder = order ; 
  }

}
