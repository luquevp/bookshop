import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { IItem } from '../../interfaces/item.interface';


@Component({
  selector: 'app-productpreview',
  templateUrl: './productpreview.component.html',
  styleUrls: ['./productpreview.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductpreviewComponent  {

  

  
}
