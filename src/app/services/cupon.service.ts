import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cupon } from '../interfaces/cupon.interface';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuponService {


  private baseUrl: string = environment.base_url;

  constructor( private http: HttpClient ) { }


  postCupon2( cupon: string ) {
    return this.http.post<Cupon>(`${ this.baseUrl }/cupones/${cupon}`, cupon);
  }

  postCupon( cupon: string ) {
    return this.http.post<Cupon>(`${ this.baseUrl }/cupones/${cupon}`, cupon)
    .pipe(
      tap( resp => {
        if (resp.ok) 
        {
            console.log(resp);


        }
      }),
      map(resp => resp),
      catchError(err => of(err.error.msg))
    );
  }

  
}
