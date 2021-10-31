// loader-interceptor.service.ts
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('paso x el interceptor');
        return next.handle(req).pipe(
            catchError(this.manejarError)
        );
    }


    manejarError(error: HttpErrorResponse)
    {
        return throwError('error ')
    }
}