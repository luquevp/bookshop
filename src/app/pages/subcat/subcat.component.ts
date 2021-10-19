import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Categoria, SubCategoria } from 'src/app/interfaces/categoria.interface';
import { IItem } from 'src/app/interfaces/item.interface';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.scss']
})
export class SubcatComponent implements OnInit {

  categorias: Categoria[] = [];
  subcategorias : SubCategoria[] = [];
  libros : IItem[] = [];
  public terminoIngresado : string = "";

  constructor( private spinner: NgxSpinnerService, private categoriasService: CategoriasService ,private activatedRoute: ActivatedRoute, private router: Router, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

   // this.activatedRoute.params
    //.subscribe(({ termino }) => this.getSubcategoriasPorCategoria(termino));



    this.spinner.show();

      
    this.activatedRoute.params
    .pipe(
      switchMap( ( { termino } ) => this.busquedasService.getLibroPorSubcat(termino))
      )
    .subscribe((libros: any) => {console.log(libros);
      
      this.libros = libros})
    
    //this.categoriasService.getCategorias()
    //.subscribe(categorias => {
      //console.log(categorias); 
      //this.categorias = categorias});

     // this.categoriasService.getSubCategorias()
    //.subscribe(subcategorias => {
      //console.log(subcategorias); 
      //this.subcategorias = subcategorias});

      this.categoriasService.getCategorias()
    .subscribe(categorias => {
      console.log(categorias); 
      this.categorias = categorias;
      this.spinner.hide();});
      
  }






  buscar(termino: string) {

    if (termino.length === 0) {
      this.router.navigateByUrl(`/`)
    }

    this.router.navigateByUrl(`/categorias/${termino}`);

  }


}