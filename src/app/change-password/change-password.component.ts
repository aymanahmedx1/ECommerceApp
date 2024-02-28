import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnDestroy {
  isLoading: boolean = false;
  errorMessage: string = '';
  changePasswordSubscription = new Subscription();
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  dataForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
    }
  );
  changePassword(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.changePasswordSubscription = this._AuthService.changePassword(form.value).subscribe({
        next: (response) => {
          this._Router.navigate(['/logIn']);
          this.isLoading = false;
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
  ngOnDestroy(): void {
    this.changePasswordSubscription.unsubscribe();
  }
}
