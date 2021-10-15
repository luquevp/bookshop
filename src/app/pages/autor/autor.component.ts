import { Component, OnInit } from '@angular/core';
import { IItem, Autor } from '../../interfaces/item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {

  public libros: IItem[] = [];

  public autores: Autor[] = [];



  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private busquedasService: BusquedasService) { }


  ngOnInit(): void {

    
    this.activatedRoute.params
    .pipe(
      switchMap( ( { termino} ) => this.busquedasService.getLibroPorAutor(termino))
      )
    .subscribe((libros: any) => {console.log(libros);
      this.libros = libros})


      


   
  }



}
