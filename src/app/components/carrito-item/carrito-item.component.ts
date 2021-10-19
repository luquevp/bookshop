import { Component, OnInit, Input } from '@angular/core';
import { CartItemModel } from '../../interfaces/item.interface';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.scss']
})
export class CarritoItemComponent implements OnInit {

  @Input() cartItem: CartItemModel;

  constructor() { }

  ngOnInit(): void {
  }

}
