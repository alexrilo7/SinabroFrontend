import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const authHttpInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          alert("401: "+error.error.error);
          break;
        case 500:
          alert("500: "+ error.error.error);
          break;
        case 404:
          alert("404: "+error.error.error);
          break;
      }

      return throwError(() => error);
    })
  );
};
