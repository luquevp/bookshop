import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Autor } from '../interfaces/item.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor( private http: HttpClient ) {



        

   }

   
  cargarAutores() {

    const url = `${ base_url }/autores`;
    return this.http.get( url)
              .pipe(
                map( (resp: {ok: boolean, autores: Autor[] }) => resp.autores ) 
              );
  }
}
