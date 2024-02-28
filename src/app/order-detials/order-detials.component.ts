import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Order } from '../interface/order';

@Component({
  selector: 'app-order-detials',
  templateUrl: './order-detials.component.html',
  styleUrls: ['./order-detials.component.scss']
})
export class OrderDetialsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public selectedOrder: {selected: Order}) {
    console.log(selectedOrder.selected);
    
   }

}
