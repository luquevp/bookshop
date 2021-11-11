import { Component, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { IItem } from '../../interfaces/item.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

libros =  [];

  constructor( private productsService: ProductsService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {


   
      /** spinner starts on init */
      this.spinner.show();
     this.productsService.getLibros()
    .subscribe(libros => {
      this.libros = libros.filter(libro => libro.stock > 0)
      console.log(this.libros);
    
      this.spinner.hide();});









  }

  

}
