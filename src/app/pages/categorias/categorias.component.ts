import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriasService } from '../../services/categorias.service';
import { SubCategoria } from '../../interfaces/categoria.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { switchMap } from 'rxjs/operators';
import { IItem } from '../../interfaces/item.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias: Categoria[] = [];
  subcategorias : SubCategoria[] = [];
  libros : IItem[] = [];

  constructor( private spinner: NgxSpinnerService ,private categoriasService: CategoriasService ,private activatedRoute: ActivatedRoute, private router: Router, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.spinner.show();


   // this.activatedRoute.params
    //.subscribe(({ termino }) => this.getSubcategoriasPorCategoria(termino));

    this.activatedRoute.params
    .pipe(
      switchMap( ( { termino} ) => this.busquedasService.getSubcategoriasPorCategoria(termino))
      )
    .subscribe((subcategorias: any) => {console.log(subcategorias);
      this.subcategorias = subcategorias})


      
    this.activatedRoute.params
    .pipe(
      switchMap( ( { termino } ) => this.busquedasService.getLibroPorCategoria(termino))
      )
    .subscribe((libros: any) => {console.log(libros);
      this.spinner.hide();
      this.libros = libros.filter(libro => libro.stock > 0)
    
      if( this.libros.length > 0 ){
        document.getElementById("elemento").style.display = 'none';
        document.getElementById("cardcategoria").style.display = '';
  
      }
      else{
        document.getElementById("elemento").style.display = '';
        document.getElementById("cardcategoria").style.display = 'none';

      }
      })
    
    //this.categoriasService.getCategorias()
    //.subscribe(categorias => {
      //console.log(categorias); 
      //this.categorias = categorias});

     // this.categoriasService.getSubCategorias()
    //.subscribe(subcategorias => {
      //console.log(subcategorias); 
      //this.subcategorias = subcategorias});
    
      
  }


public terminoIngresado : string = "";


getSubcategoriasPorCategoria(termino: string) {


    this.busquedasService.getSubcategoriasPorCategoria(termino).subscribe((resp: any) => {

this.terminoIngresado = termino;
       this.subcategorias = resp.subcategorias;
      // this.autores = resp.autores;

      
      
    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 
      console.log(err)
    });
  }


  buscar(termino: string) {

    if (termino.length === 0) {
      this.router.navigateByUrl(`/`)
    }

    this.router.navigateByUrl(`/subcategorias/${termino}`);

  }


}
