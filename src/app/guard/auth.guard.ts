import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  if(auth.userLogedIn.value){
    return true ; 
  }
  else{
    router.navigate(["logIn"]);
    return false ; 
  }
};
