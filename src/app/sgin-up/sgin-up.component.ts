import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sgin-up',
  templateUrl: './sgin-up.component.html',
  styleUrls: ['./sgin-up.component.scss']
})
export class SginUpComponent implements OnDestroy {
  isLoading: boolean = false;
  errorMessage: string = '';
  signUpSubscription = new Subscription();
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^(002)?01[01251][0-9]{8}$/)]),
    }
  );
  register(form: any) {
    console.log(form);
    
    if (form.valid) {
      this.isLoading = true;
      this._AuthService.signUp(form.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this._Router.navigate(['logIn']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoading = false;
        }
      })

    }

  }
   ngOnDestroy(): void {
    this.signUpSubscription.unsubscribe();
  }
}
