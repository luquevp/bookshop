import { Component, Input, KeyValueDiffers, OnInit } from '@angular/core';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { IItem } from '../../interfaces/item.interface';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

/*

  public libros3: Array<IItem> = [{
    id: 0,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789874132017_1.jpg?id_com=1113',
    name: 'Arduino',
    price: 500,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ultricies lacus sed turpis tincidunt id. ',
        quantity : 1
  },
  {
    id: 1,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789874132390_1.jpg?id_com=1113',
    name: 'ESP8266 NodeMCU',
    price: 350,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ultricies lacus sed turpis tincidunt id. ',    quantity : 1
  },
  {
    id: 2,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789500211871_1.jpg?id_com=1113',
    name: 'ESP8266 NodeMCU',
    price: 350,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ultricies lacus sed turpis tincidunt id. ',
        quantity : 1
  },
  {
    id: 3,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789878454078_1.jpg?id_com=1113',
    name: 'ESP8266 NodeMCU',
    price: 350,
    description: 'Autor',
        quantity : 1
  },
  {
    id: 4,
    img: 'https://contentv2.tap-commerce.com/cover/large/9786076219843_1.jpg?id_com=1113',
    name: 'ESP8266 NodeMCU',
    price: 350,
    description: '',
        quantity : 1
  },
  {
    id: 5,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789500761277_1.jpg?id_com=1113',
    name: 'Modulo Relay Rele De 1 ',
    price: 120,
    description: '',
    quantity : 1
  },
  {
    id: 6,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789877391695_1.jpg?id_com=1113',
    name: 'ESP8266 NodeMCU',
    price: 350,
    description: '',
    quantity : 1
  },
  {
    id: 7,
    img: 'https://contentv2.tap-commerce.com/cover/large/9789504973317_1.jpg?id_com=1113',
    name: 'ESP8266 NodeMCU',
    price: 350,
    description: '',
        quantity : 1
  }];
*/
libros =  [];

  constructor( private productsService: ProductsService) { }

  ngOnInit(): void {

    
     this.productsService.getLibros()
    .subscribe(libros => {
      console.log(libros); 
      this.libros = libros});


  }

  

}
