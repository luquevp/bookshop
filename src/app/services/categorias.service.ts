import { Injectable } from '@angular/core';
import { Categoria, SubCategoria } from '../interfaces/categoria.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

 
  public _categorias : Categoria[];
  public _subcategorias : SubCategoria[];


  private baseUrl: string = environment.base_url;

  constructor( private http: HttpClient ) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${ this.baseUrl }/categorias`);
  }

  getSubCategorias(): Observable<SubCategoria[]> {
    return this.http.get<SubCategoria[]>(`${ this.baseUrl }/subcategorias`);
  }

 
}
