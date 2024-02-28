import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnDestroy {
  constructor(private _AuthService:AuthService , private _Router:Router){}

  errorMessage:string='';
  verfiyCodeSubscription = new Subscription();
  dataForm=new FormGroup({
    resetCode:new FormControl('',[Validators.required , Validators.pattern(/^[0-9]{1,}$/)]),
  });

  verfiyCode(form:FormGroup){
    this._AuthService.verfiyCode(form.value).subscribe({
      next:(res)=>{
        this._Router.navigate(['changePassword']);
      },
      error:(err)=>{
       this.errorMessage = err.error.message;
      },
    })
  }
  ngOnDestroy(): void {
    this.verfiyCodeSubscription.unsubscribe();
  }
}
