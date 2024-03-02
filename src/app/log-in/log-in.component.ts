import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnDestroy {
  logInSubscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    }
  );
  register(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this.logInSubscription = this._AuthService.logIn(form.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userName', response.user.name);
            this._AuthService.userLogedIn.next(true);
            this._AuthService.userName.next(response.user.name);
            this._Router.navigate(['home']);
            this._AuthService.getUserCartItemCount();
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
    this.logInSubscription.unsubscribe();
  }
}
