import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

import { Observable, of } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { SubCategoria } from '../interfaces/categoria.interface';
import { Comprobante, ComprobanteConDetalle, Detalle } from '../interfaces/comprobante.interface';
import { preguntasfrecuentes } from '../interfaces/preguntas.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }


  // buscar(
  //     tipo: 'usuarios'|'medicos'|'clinicas',
  //     termino: string
  //   ) {

  //   const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
  //   return this.http.get<any[]>( url, this.headers )
  //           .pipe(
  //             map( (resp: any ) => {

  //               switch ( tipo ) {
  //                 case 'usuarios':
  //                   return this.transformarUsuarios( resp.resultados )

  //                 case 'clinicas':
  //                   return this.transformarClinicas( resp.resultados )

  //                 case 'medicos':
  //                    return this.transformarMedicos( resp.resultados )

  //                 default:
  //                   return [];
  //               }

  //             })
  //           );

  // }

  buscarEvento( termino:string){

    const url = `${ base_url }/buscar/eventos/nombre/${ termino }`;
    return this.http.get<any>( url).pipe(
      tap(( resp ) => {
        if (resp) {
          console.log(resp);
        }
      }),
      map(resp => resp),
      catchError(err => of(err.msg))
    );
  }

  buscarLibroAutor( termino:string){

    const url = `${ base_url }/buscar/productos/tituloautor/${ termino }`;
    return this.http.get<any[]>( url)
  }


  
  getLibroPorAutor( termino: string ):Observable<IItem> {
    return this.http.get<IItem>(`${ base_url }/buscar/productos/autor/${ termino }`);
  }

  
  getLibroPorEditorial( termino: string ):Observable<IItem> {
    return this.http.get<IItem>(`${ base_url }/buscar/productos/editorial/${ termino }`);
  }

  getSubcategoriasPorCategoria( termino: string ):Observable<SubCategoria> {
    return this.http.get<SubCategoria>(`${ base_url }/buscar/categorias/subcatxcat/${ termino }`);
  }

  getLibroPorCategoria( termino: string ):Observable<IItem> {
    return this.http.get<IItem>(`${ base_url }/buscar/productos/categoria/${ termino }`);
  }
  
  
  getLibroPorSubcat( termino: string ):Observable<IItem> {
    return this.http.get<IItem>(`${ base_url }/buscar/productos/subcat/${ termino }`);
  }



  getComprobantesPorUsuario( termino: string ):Observable<ComprobanteConDetalle> {
    return this.http.get<ComprobanteConDetalle>(`${ base_url }/buscar/comprobantes/compxuser/${ termino }`);
  }

  getComprobantePorNumero( numero: number ):Observable<ComprobanteConDetalle> {
    return this.http.get<ComprobanteConDetalle>(`${ base_url }/buscar/comprobantes/compnum/${ numero }`);
  }

  getDetallePorNumeroComprobante (numero : number): Observable<Detalle> {
    return this.http.get<Detalle>(`${ base_url }/buscar/comprobantes/detcompxnumcomp/${ numero }`);
  }

  getPreguntasFrecuentes(): Observable<preguntasfrecuentes[]> {
    return this.http.get<preguntasfrecuentes[]>(`${ base_url }/preguntasFrecuentes`);
  }

  
}
