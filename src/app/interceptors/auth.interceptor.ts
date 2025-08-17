import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1️⃣ Get token from localStorage (or another storage)
    const token = localStorage.getItem('token');

    // 2️⃣ If token exists, clone request and add Authorization header
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'

        }
      });
    }

    // 3️⃣ Pass the request to the next handler
    return next.handle(authReq);
  }
}
