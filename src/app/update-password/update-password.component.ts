import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent  implements OnDestroy{
  isLoading: boolean = false;
  errorMessage: string = '';
  updatePasswordSubscription = new Subscription();
  constructor(private _AuthService: AuthService, private _Router: Router , private toastr: ToastrService) { }

  dataForm = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
    }
  );
  changePassword(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this._AuthService.updatePassword(form.value).subscribe({
        next: (response) => {
          console.log(response);
          this.showSuccess("Password Changed Successfuly") ; 
          this._AuthService.logOut();
          this._Router.navigate(['/logIn']);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      })

    }

  }
  decodeToken(token: any): any {
    const decoded = jwtDecode(token);
    return decoded;
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  ngOnDestroy(): void {
    this.updatePasswordSubscription.unsubscribe();
  }
}
