import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/_services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token: string = this.authService.getAccessToken();

    if (!token) {
      return next.handle(request);
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
    }

    request = request.clone({
      setHeaders: headers,
    })
    return next.handle(request);
  }
}
