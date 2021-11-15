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
import Swal from 'sweetalert2';
import { of } from 'rxjs';
import { CuponService } from '../../services/cupon.service';
import { Cupon } from 'src/app/interfaces/cupon.interface';

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
  public totalFinal: number = 0;

  public totalQuantity: number = 0;
  public comprobante: Comprobante;
  public botonLoguear: boolean = false;
  public quantity: string;
  public cupon: Cupon;
  public descuento: number = 0;
  public cuponCodigo: string;
  public porcentajeDescuento: number;


  nombreUsuario = localStorage.getItem('id');



  constructor(private cuponService: CuponService, private _cartService: CartService, private toastr: ToastrService, private usuarioService: UsuarioService, private router: Router, public storageService: StorageServiceService, private messageService: MessageService, private productsService: ProductsService) {


  }



  ngOnInit() {

    // console.log(this.items);

    // this.storageService.setCart(this.items);

    this.renderizarBotones();



    if (this.storageService.existsCart()) {
      this.items = this.storageService.getCart();

      // this.storageService.setCart(this.items);



    }

    this._cartService.currentDataCart$.subscribe(x => {



      if (x) {



        this.items = x;

        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);
        this.totalFinal = this.totalPrice


        

      }

console.log(this.items);
      if ( this.items === null ) {
        console.log(this.items?.length);
        document.getElementById("carrovacio").style.display = '';
        document.getElementById("cart").style.display = 'none';
        document.getElementById("formcupon").className = "disabled";

  
      } else if (this?.items?.length === 0){ 
        document.getElementById("carrovacio").style.display = '';
        document.getElementById("cart").style.display = 'none';
        document.getElementById("formcupon").className = "disabled"; }
      else if (this.items || this.items.length) {
       
        // document.getElementById("carrovacio").style.display = 'none';
        // document.getElementById("cart").style.display = '';
        document.getElementById("formcupon").className = "enabled";
  
  
      }
  
      

      //this.storageService.setCart(this.items);



      // if (this.storageService.existsCart()) {
      //   this.items = this.storageService.getCart();
      //   this.storageService.setCart(this.items);



      // }

      //  

      if (this.items) {
        this.totalPrice = this.getTotal();
        this.totalFinal = this.totalPrice
      }

    })
  




  }

  renderizarBotones() {
    this.quantity = localStorage.getItem('CartQuantity');
    console.log(localStorage.getItem('token'));

    if (localStorage.getItem('token') && localStorage.getItem('token') != "undefined"  && this.quantity != "0" && this.quantity != null) {
      this.botonLoguear = false;

      this.paypal();
    }else if (localStorage.getItem('token') === undefined) {
      this.botonLoguear = true;

    }
    else {
      this.botonLoguear = true;
    }


  }

  paypal() {
    // if (localStorage.getItem('token')) {
    paypal.
      Buttons({
        style: {
          layout: 'vertical',
          color: 'white',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Libros",
                amount: {
                  currency_code: 'USD',
                  value: this.totalFinal
                }
              }

            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          this.comprar();
          //  this.emptyCart();

        },
        onError: err => {
          console.log(err);
          if (this.items.length === 0) {
            Swal.fire('Oops!', 'Parece que tu carrito esta vacío, agrega ítems para continuar.', 'warning');
          }
          else { Swal.fire('Error!', 'La compra no fue completada.', 'error'); }

        }

      })
      .render(this.paypalElement.nativeElement);


    //   } else {
    //     this.botonLoguear = true;
    //   }
  }

  getTotal(): number {
    let total = 0;
    this.items.forEach(item => {
      total += item.cantidad * item.precio;
    });
    return +total.toFixed(2);
  }

  onChange() {
    // if (this.items.length > 0) {
    //   document.getElementById("carrovacio").style.display = 'none';
    //   document.getElementById("cart").style.display = '';
    //   document.getElementById("formcupon").className = "enabled";



    // }
    // else {
    //   document.getElementById("carrovacio").style.display = '';
    //   document.getElementById("cart").style.display = 'none';
    //   document.getElementById("formcupon").className = "disabled";


    // }
    if ( this.items === null ) {
      console.log(this.items?.length);
      document.getElementById("carrovacio").style.display = '';
      document.getElementById("cart").style.display = 'none';
      document.getElementById("formcupon").className = "disabled";


    } else if (this?.items?.length === 0){ 
      document.getElementById("carrovacio").style.display = '';
      document.getElementById("cart").style.display = 'none';
      document.getElementById("formcupon").className = "disabled"; }
    else if (this.items || this.items.length) {
     
      // document.getElementById("carrovacio").style.display = 'none';
      // document.getElementById("cart").style.display = '';
      document.getElementById("formcupon").className = "enabled";


    }

    console.log(this.items);
    this._cartService.currentDataCart$.subscribe(x => {
      if (x) {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);

      }
    })




    this.storageService.setCart(this.items);
    this.totalPrice = this.getTotal();
    this.totalFinal = this.totalPrice

  }

  public remove(item: IItem) {
    this._cartService.changeCart(item);
    this._cartService.removeElementCart(item);
    this.onChange();
    this.toastr.success('¡El producto fue eliminado de tu carrito!', ' Adios :( ');

  }


  public comprar() {
    console.log(this.items);


    if (this.cupon) {

      this.comprobante = {

        subTotal: this.totalPrice,
        descuento: this.descuento,
        total: this.totalFinal,
        cuponId: this.cupon.cupon._id,
        productos: this.items,
        usuario: this.nombreUsuario
      }


    } else {
      this.comprobante = {

        subTotal: this.totalPrice,
        descuento: this.descuento,
        total: this.totalFinal,
        productos: this.items,
        usuario: this.nombreUsuario
      }


    }



    console.log(this.comprobante);

    this.productsService.postComprobante(this.comprobante)
      .subscribe(resp => {
        console.log('Respuesta', resp);

        Swal.fire('Buen Trabajo!', 'La compra fue exitosa!', 'success');
        this.router.navigateByUrl(`/`)



      })


    //limpiar
    localStorage.setItem('CartQuantity', "0");
    localStorage.setItem('cart', "null")
    // this.items = null;
    // this.totalPrice = 0;
    // this.descuento = 0;
    // this.totalFinal = 0;
    this.emptyCart();
    



    // this.storageService.clear();

  }


  emptyCart(): void {
    this.items = [];
    // this.totalPrice = 0;
    // this.storageService.clear();
    // // this._cartService.removeAllCart();
    // // this.renderizarBotones();
    

    this.onChange();

    
    this.items.forEach(item => {
    this.remove(item);
    });

    this.quitarCupon();




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

  continuarCompra() {

    this.quantity = localStorage.getItem('CartQuantity');
    console.log(this.quantity);
    if (this.quantity != "0" && this.quantity != null) {
      this.router.navigateByUrl(`/login`)
    }
    else {
      Swal.fire('Oops!', 'Parece que tu carrito esta vacío, agrega ítems para continuar.', 'warning');


    }

    // this.router.navigateByUrl(`/buscar/libros/${termino}`);


  }

  // aplicarCupon( termino: string ){

  //  console.log(termino);

  //  this.cuponService.postCupon(termino)
  //     .subscribe(resp => {
  //       console.log('Respuesta', resp);
  //     })


  //   }


  aplicarCupon(termino: string) {

    if ((<HTMLInputElement>document.getElementById("inputCupon")).value === "") {
      Swal.fire('Oops!', 'Ingrese un cupón para continuar.', 'error');


    } else {
      console.log(termino);

      this.cuponService.postCupon(termino)
        .subscribe(resp => {
          this.cupon = resp

          console.log(resp.ok);
          console.log(this.cupon);
          if (resp.ok === true) {





            if (this.cupon.cupon.tipo === "VOUCHER") {

              document.getElementById("elemento").style.display = '';

              (<HTMLInputElement>document.getElementById("btnApply")).disabled = true;
              this.cuponCodigo = this.cupon.cupon.codigo;
              document.getElementById("cartlist").className = "disabled";










              console.log('voucher');
              this.porcentajeDescuento = this.cupon.cupon.porcentaje;
              this.descuento = this.totalPrice * (this.porcentajeDescuento / 100)
              console.log(this.descuento);

              console.log(this.totalPrice);

              this.totalFinal = this.totalPrice - this.descuento;


            }
            else {
              console.log('gift card');


              this.descuento = this.cupon.cupon.valor;

              if (this.descuento > this.totalPrice) {

                console.log('es mayor');
                Swal.fire('Oops!', 'La orden de compra debe ser mayor al monto de la gift card. ( $' + this.descuento + ')', 'error');
                this.descuento = 0;

              } else {
                document.getElementById("elemento").style.display = '';
                (<HTMLInputElement>document.getElementById("cartlist")).disabled = true;


                (<HTMLInputElement>document.getElementById("btnApply")).disabled = true;

                document.getElementById("cartlist").className = "disabled";

                this.cuponCodigo = this.cupon.cupon.codigo;
                this.totalFinal = this.totalPrice - this.descuento;


              }





            }



          } else {
            document.getElementById("elemento").style.display = 'none';

            Swal.fire('Oops!', resp, 'error');

          }
        }

        )
    }






  }




  quitarCupon() {

    this.cupon = null;
    console.log(this.cupon);
    document.getElementById("elemento").style.display = 'none';
    (<HTMLInputElement>document.getElementById("inputCupon")).value = "";
    (<HTMLInputElement>document.getElementById("btnApply")).disabled = false;
    document.getElementById("cartlist").className = "enabled";

    this.descuento = 0;
    this.totalPrice = this.getTotal();
    this.totalFinal = this.totalPrice

  }
}
