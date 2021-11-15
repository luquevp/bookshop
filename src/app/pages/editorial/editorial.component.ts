import { Component, OnInit } from '@angular/core';
import { IItem, Autor } from '../../interfaces/item.interface';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.scss']
})
export class EditorialComponent implements OnInit {

  public libros: IItem[] = [];

  public autores: Autor[] = [];



  constructor(private spinner: NgxSpinnerService, private productsService: ProductsService, private activatedRoute: ActivatedRoute, private router: Router, private busquedasService: BusquedasService) { }


  ngOnInit(): void {

    this.spinner.show();

    this.activatedRoute.params
    .pipe(
      switchMap( ( { termino} ) => this.busquedasService.getLibroPorEditorial(termino))
      )
    .subscribe((libros: any) => {
      this.libros = libros;
      this.spinner.hide();})


   
  }
}
