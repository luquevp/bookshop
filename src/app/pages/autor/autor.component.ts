import { Component, OnInit } from '@angular/core';
import { IItem, Autor } from '../../interfaces/item.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {

  public libros: IItem[] = [];

  public autores: Autor[] = [];



  constructor(private spinner: NgxSpinnerService, private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private busquedasService: BusquedasService) { }


  ngOnInit(): void {
    this.spinner.show();

    
    this.activatedRoute.params
    .pipe(
      switchMap( ( { termino} ) => this.busquedasService.getLibroPorAutor(termino))
      )
    .subscribe((libros: any) => {console.log(libros);
      this.libros = libros;
      if( libros.length > 0){
        document.getElementById("elemento").style.display = 'none';

      }
      else{
        document.getElementById("elemento").style.visibility = 'inline';
      }
      this.spinner.hide();})

     
     


   
  }



}
