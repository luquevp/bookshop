import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { tap } from 'rxjs/operators';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { MessageService } from '../../services/message.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Comprobante } from '../../interfaces/comprobante.interface';
import { ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';

declare var paypal;


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})



export class CarritoComponent implements OnInit {


  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;



  public items: IItem[] = []
  public cartItems: [];

  // tslint:disable-next-line: no-inferrable-types
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public comprobante: Comprobante;
  public botonLoguear: boolean = false;

  nombreUsuario = localStorage.getItem('id');



  constructor( private _cartService: CartService, private toastr: ToastrService, private usuarioService: UsuarioService, private router: Router, public storageService: StorageServiceService, private messageService: MessageService, private productsService: ProductsService) {


  }

  

  ngOnInit() {


    if (localStorage.getItem('token')) {
      paypal.
      Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.items[0].titulo,
                amount: {
                  currency_code: 'USD',
                  value: this.totalPrice
                }
              }

            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          this.comprar();
          this.emptyCart();

        },
        onError: err => {
          console.log(err);
        }

      })
      .render(this.paypalElement.nativeElement);


    } else {
      this.botonLoguear = true;
    }

    
    if (this.storageService.existsCart()) {
      this.items = this.storageService.getCart();



    }

    this._cartService.currentDataCart$.subscribe(x => {

      if (x) {

        this.items = x;

        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);


      }

      this.storageService.setCart(this.items);

      if (this.items) {
        this.totalPrice = this.getTotal();
      }

    })





  }

  getTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.cantidad * item.precio;
    });
    return +total.toFixed(2);
  }

  onChange() {
    this._cartService.currentDataCart$.subscribe(x => {
      if (x) {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);


      }
    })

    this.storageService.setCart(this.items);
    this.totalPrice = this.getTotal();


  }

  public remove(item: IItem) {
    this._cartService.changeCart(item);
    this._cartService.removeElementCart(item);
    this.toastr.success('¡El producto fue eliminado de tu carrito!', ' Adios :( ');

  }




  public comprar() {
    console.log(this.items);
    this.comprobante = {
      monto: this.totalPrice,
      productos: this.items,
      usuario: this.nombreUsuario
    }

    console.log(this.comprobante);

    this.productsService.postComprobante(this.comprobante)
      .subscribe(resp => {
        console.log('Respuesta', resp);
      })
  }


  emptyCart(): void {
    this.items = [];
    this.totalPrice = 0;
    this.storageService.clear();
    this._cartService.removeAllCart();

  }

  public downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }




}
