import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { IItem } from '../../interfaces/item.interface';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { ViewportScroller } from '@angular/common';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../interfaces/categoria.interface';
import { UsuarioService } from '../../services/usuario.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  public openCart: boolean = false;
  public cantProducts: number = 0;
  // tslint:disable-next-line: no-inferrable-types
  public totalQuantity: number = 0;
  categorias: Categoria[] = [];


  constructor(private auth: AuthService,
    private router: Router,
    private _cartService: CartService, private categoriasService: CategoriasService,
    private usuarioService: UsuarioService) {
  }

  
  nombreUsuario = localStorage.getItem('nombre')

  ngOnInit() {

   
    

    this.categoriasService.getCategorias()
      .subscribe(categorias => {
        this.categorias = categorias
      });


    this._cartService.currentDataCart$.subscribe(x => {
      if (x) {
        this.totalQuantity = x.length;
      }
    })


    // console.log(this.usuario);

  }


  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

  sideBarToggler(event: Event) {
    this.sideBarOpen = !this.sideBarOpen;
  }



  public cart() {
    this.openCart = !this.openCart;
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      this.router.navigateByUrl(`/`)
    }

    this.router.navigateByUrl(`/categorias/${termino}`);

  }


}
