import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { Usuario } from '../interfaces/usuario.interface';



const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl: string = environment.base_url;

  constructor(private http: HttpClient) { }
  
  // logout() {
  //   localStorage.removeItem('token');

  //   this.auth2.signOut().then(() => {

  //     this.ngZone.run(() => {
  //       this.router.navigateByUrl('/login');
  //     })
  //   });



  // }
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

  getUsuarios(desde: number = 0) {
    return this.http.get<CargarUsuario>(`${this.baseUrl}/usuarios/?limite=100&desde=${desde}`, this.headers)
  }

  getUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/usuarios/${id}`)
  }

  getUsuariosBuscador(termino: string) {
    return this.http.get<Usuario[]>(`${this.baseUrl}/buscar/usuarios/f/${termino}`)
      .pipe(
        catchError(err => of(err.error))
      )
  }

  nuevoUsuario(usuario : Usuario) {

    return this.http.post<Usuario>(`${this.baseUrl}/usuarios/`, usuario)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  actualizarUsuario(usuario : Usuario) {

    return this.http.put<Usuario>(`${this.baseUrl}/usuarios/registro/${usuario.uid}`, usuario, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  eliminarUsuario(_id: string) {
    return this.http.delete<Usuario>(`${this.baseUrl}/usuarios/${_id}`, this.headers)
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }
}
