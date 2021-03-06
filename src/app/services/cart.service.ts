import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/item.interface';
import { StorageServiceService } from './storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = new BehaviorSubject<Array<IItem>>(null);
  public currentDataCart$ = this.cart.asObservable();
  constructor( public storageService: StorageServiceService ) { }

  public changeCart(newData: IItem) {


    //Obtenemos el valor actual
  //  let listCart = this.cart.getValue();
  let listCart = this.storageService.getCart();
    
    //Si no es el primer item del carrito
    if(listCart)
    {
      //Buscamos si ya cargamos ese item en el carrito
      let objIndex = listCart.findIndex((obj => obj._id == newData._id));
      //Si ya cargamos uno aumentamos su cantidad
      if(objIndex != -1)
      {
        listCart[objIndex].cantidad += 1;
      }
      //Si es el primer item de ese tipo lo agregamos derecho al carrito
      else {
        listCart.push(newData);
        
      }  
    }
    //Si es el primer elemento lo inicializamos
    else {
      listCart = [];
      listCart.push(newData);
    }

    this.cart.next(listCart);
    this.storageService.setCart(listCart);

  }

  public removeElementCart(newData:IItem){
    //Obtenemos el valor actual de carrito
    let listCart = this.cart.getValue();
    //Buscamos el item del carrito para eliminar
    let objIndex = listCart.findIndex((obj => obj._id == newData._id));
    if(objIndex != -1)
    {
      //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciar√°)
      listCart[objIndex].cantidad = 1;
      //Eliminamos el item del array del carrito
      listCart.splice(objIndex,1);
    }

    this.cart.next(listCart);

  }

  public removeAllCart(){
    //Obtenemos el valor actual de carrito
 
    this.cart = new BehaviorSubject<Array<IItem>>(null);
    this.currentDataCart$ = this.cart.asObservable();

}



public removeAllElementCart(newData:IItem){
  //Obtenemos el valor actual de carrito
  let listCart = this.cart.getValue();
  //Buscamos el item del carrito para eliminar
  let objIndex = listCart.findIndex((obj => obj._id == newData._id));
  if(objIndex != -1)
  {
    //Seteamos la cantidad en 1 (ya que los array se modifican los valores por referencia, si vovlemos a agregarlo la cantidad no se reiniciar√°)
    listCart[objIndex].cantidad = 1;
    //Eliminamos el item del array del carrito
    listCart.splice(objIndex,1);
  }

 // this.cart.next(listCart);

}


}