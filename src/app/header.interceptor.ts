import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem("token")) {
      let userToken: any = localStorage.getItem("token");
      let newReq = request.clone({ setHeaders: { "token": userToken } });      
      return next.handle(newReq);
    }    
    return next.handle(request);
  }
}
