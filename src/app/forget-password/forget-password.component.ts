import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  errorMessage:string='';
  resetForm=new FormGroup({
    email:new FormControl('',[Validators.required , Validators.email]),
  });



  forgetPassword(form:FormGroup){
    this._AuthService.sendRestPasswordCode(form.value).subscribe({
      next:(res)=>{
        if(res.statusMsg ==='success'){
          this._Router.navigate(['verify']);
        }
      },
      error:(err)=>{
       this.errorMessage = err.error.message;
      },
    })
  }
}
