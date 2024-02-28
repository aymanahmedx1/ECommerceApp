import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  isLoading: boolean = false;
  errorMessage: string = '';
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{1}[a-zA-z0-9]{6,15}$/)]),
    }
  );
  register(form: any) {
    if (form.valid) {
      this.isLoading = true;
      this._AuthService.logIn(form.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userName', response.user.name);
            this._AuthService.userLogedIn.next(true);
            this._AuthService.userName.next(response.user.name);
            this._Router.navigate(['home']);
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
}
