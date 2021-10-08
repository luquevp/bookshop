import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


 public _libros : IItem[];

  private baseUrl: string = environment.base_url;

  constructor( private http: HttpClient ) { }

  getLibros(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${ this.baseUrl }/productos`);
  }

 
 //getLibros3() {
   //return this.http.get(`${ this.baseUrl }/productos`);

   //return this.http.get<IItem[]>(`${ this.baseUrl }/productos`)
   //.pipe(map((products:any) => products.result || []) , 
   //catchError(error => { return throwError('its a trap')}));
 //}

  

  getLibroPorId( id: string ):Observable<IItem> {
    return this.http.get<IItem>(`${ this.baseUrl }/productos/${ id }`);
  }

  getSugerencias( termino: string ): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${ this.baseUrl }/productos?q=${ termino }&_limit=6`);
  }
}
