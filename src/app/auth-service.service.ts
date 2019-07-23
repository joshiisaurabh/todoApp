import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =localStorage.getItem("token"); // you probably want to store it in localStorage or something
    let userId =localStorage.getItem("userId");
    if(!userId){
      userId='demo';
    }
    if (!token) {
      return next.handle(req);
    }
    const req1 = req.clone({
      headers: req.headers.set('Authorization', `${token}`).set('userId',userId )
    });
    return next.handle(req1);
  }
  constructor() { }
}
