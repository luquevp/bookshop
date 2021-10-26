import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Comprobante } from '../interfaces/comprobante.interface';
import { Evento } from '../interfaces/eventos.interface';


@Injectable({
  providedIn: 'root'
})
export class EventosService {


 public eventos : Evento[];

  private baseUrl: string = environment.base_url;

  constructor( private http: HttpClient ) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${ this.baseUrl }/eventos`);
  }
}
