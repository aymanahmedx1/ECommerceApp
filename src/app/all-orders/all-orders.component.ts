import { Component, OnDestroy, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CartService } from '../service/cart.service';
import { Order } from '../interface/order';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetialsComponent } from '../order-detials/order-detials.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit, OnDestroy {
  constructor(private _CartService: CartService, private _MatDialog: MatDialog) { }
  ngOnDestroy(): void {
    this.allOrderSubscribe.unsubscribe();
  }
  allOrderSubscribe = new Subscription();
  allOrders: Order[] = [];

  ngOnInit(): void {
    let token = localStorage.getItem("token");
    let decoded = this.decodeToken(token);
    this.allOrderSubscribe = this._CartService.getAllOrders(decoded.id).subscribe({
      next: (response) => {
        let orders: Order[] = response;
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

  selectOrder(order: any) {
    this.selectOrder = order;

  }


  openDialog(order: Order): void {
    const dialogRef = this._MatDialog.open(OrderDetialsComponent, {
      data: { selected: order },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}


