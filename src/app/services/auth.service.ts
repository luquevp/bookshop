import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../interfaces/auth.interface';
import { borderTopRightRadius } from 'html2canvas/dist/types/css/property-descriptors/border-radius';
import { Role } from '../interfaces/usuario.interface';
import { Provincia } from '../interfaces/provincia.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }

  registro(nombre: string, email: string, password: string, rol: Role, provincia: string,
    localidad: string,
    direccion: string,
    codigoPostal: number,
    celular: number) {

    const url = `${this.baseUrl}/usuarios/registro`;
    const body = { email, password, nombre, rol, provincia, localidad, direccion, codigoPostal, celular };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(({ ok, token }) => {
          if (ok) {
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }



  login(email: string, password: string) {

    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this.setToken(resp)
            console.log(resp);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );
  }




  validarToken(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        tap(resp => {
          if (resp.ok) {
            this.setToken(resp)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }

  logout() {
    localStorage.clear();
  }

  setToken(resp: AuthResponse) {
    localStorage.setItem('token', resp.token!)
    localStorage.setItem('nombre', resp.usuario.nombre)
    localStorage.setItem('id', resp.usuario.uid)

  }



  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${ this.baseUrl }/provincias`);
  } g
}
