import { Component, OnInit, Input, Output } from '@angular/core';
import { IItem, Autor } from '../../interfaces/item.interface';
import { CartService } from '../../services/cart.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';





@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss'],
  
  providers: [NgbModalConfig, NgbModal]

})
export class ProductcardComponent  {

 @Input() libro: IItem ; 
 @Output() selected: IItem;
 

 constructor(config: NgbModalConfig, private modalService: NgbModal, private _cartService: CartService, private toastr: ToastrService) {
  // customize default values of modals used by this component tree
  config.keyboard = false;
}

public addCart(libro: IItem)
{
  this._cartService.changeCart(libro);
  this.toastr.success('¡El producto fue añadido a tu carrito!', 'Enhorabuena :)');

}

  public ver(libro: IItem)
  {
    this.selected = libro;
    //console.log(this.selected);
  }



  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  

}
