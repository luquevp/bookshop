import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-productsbestsellers',
  templateUrl: './productsbestsellers.component.html',
  styleUrls: ['./productsbestsellers.component.scss']
})
export class ProductsbestsellersComponent implements OnInit {

  libros =  [];

  constructor( private productsService: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {


   
      /** spinner starts on init */
      this.spinner.show();
     this.productsService.getLibrosMasVendidos()
    .subscribe(libros => {
      this.libros = libros;
      console.log(libros);
      this.spinner.hide();});


  }
}
