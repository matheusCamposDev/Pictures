import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(tap(event => {
        if (event instanceof HttpResponse) {
          this.loadingService.stop();
        } else {
          this.loadingService.start();
        }
      }));
  }
};
