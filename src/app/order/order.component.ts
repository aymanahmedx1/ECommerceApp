import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../service/cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(private _CartService:CartService , private _ActivatedRoute:ActivatedRoute) { }
  
  addressForm = new FormGroup(
    {
      details: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]),
      city: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(002)?01[01251][0-9]{8}$/)]),
    }
  );


 
  payNow(form: any ) {
    if (form.valid) {
     let cartID =  this._ActivatedRoute.snapshot.params['cartID']; 
     console.log(cartID);
     
      this.isLoading = true;
      this._CartService.createOrder(form.value,cartID).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status == 'success') {
              location.href = response.session.url ; 
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      })

    }

  }
}
