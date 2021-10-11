import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Autor } from '../interfaces/item.interface';
import { Observable, throwError } from 'rxjs';


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class AutorService {

  public _autores : Autor[];

  private baseUrl: string = environment.base_url;

  constructor( private http: HttpClient ) { }

  getAutores(): Observable<Autor[]> {
    return this.http.get<Autor[]>(`${ this.baseUrl }/autores`);
  }
}
