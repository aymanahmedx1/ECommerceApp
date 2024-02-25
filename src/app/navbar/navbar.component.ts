import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  logedSubscribe = new Subscription();
  userNameSubscribe = new Subscription();
  userLogged: boolean = false;
  userName: string = '';

  constructor(private _AuthService: AuthService) { }


  ngOnInit(): void {
    this.logedSubscribe = this._AuthService.userLogedIn.subscribe({
      next: (value) => { this.userLogged = value }
    })
    this.userNameSubscribe = this._AuthService.userName.subscribe({
      next: (value) => { this.userName = value ; console.log(this.userName);
      }
    })
  }
  logOut() {
    this._AuthService.logOut();
  }
  ngOnDestroy(): void {
    // this.logedSubscribe.unsubscribe();
    // this.userNameSubscribe.unsubscribe();
  }
}
