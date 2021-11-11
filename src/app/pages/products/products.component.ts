import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { IItem, Autor } from '../../interfaces/item.interface';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  faSearch = faSearch;

  public libros: IItem[] = [];

  public autores: Autor[] = [];

public terminoIngresado : string = "";


  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private busquedasService: BusquedasService) { }

  ngOnInit(): void {


    this.activatedRoute.params
      .subscribe(({ termino }) => this.buscarLibroAutor(termino));
  }

  buscarLibroAutor(termino: string) {

    this.libros = [];
    this.autores = [];


    this.busquedasService.buscarLibroAutor(termino).subscribe((resp: any) => {

this.terminoIngresado = termino;
      // this.libros = resp.libros;
      // this.autores = resp.autores;

      let todo: any [] = resp.libros.concat([...resp.autores])

      todo = todo.filter((value, index, arr) => arr.findIndex(n => n["_id"] === value["_id"]) == index)

      this.libros = todo;

     console.log(this.libros);
     if( this.libros.length > 0){
      document.getElementById("404").style.display = 'none';

    }
    else{
      document.getElementById("404").style.display = '';
    }
      
    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404, 
      console.log(err)
    });
  }


  buscar(termino: string) {

    if (termino.length === 0) {
      this.router.navigateByUrl(`/`)
    }

    this.router.navigateByUrl(`/buscar/libros/${termino}`);

  }



}
