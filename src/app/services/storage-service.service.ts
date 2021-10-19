import { Injectable } from '@angular/core';
import { CartItemModel, IItem } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  existsCart(): boolean {
    return localStorage.getItem('cart') != null;
  }

  setCart(cart: IItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): IItem[] {
    return JSON.parse(localStorage.getItem('cart'));
  }
  
  clear(): void {
    localStorage.setItem('cart', null);
  }
}
