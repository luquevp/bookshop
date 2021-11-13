import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { IItem } from '../../interfaces/item.interface';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  //public formSubmitted = false;
  //public auth2: any;
  //public logueado: boolean;
  public responsepass = "";
  public responseemail= "";
  public responsegeneral = "";


  public loginForm = this.fb.group({
    email: [ '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [true]
  });


  public items: IItem[];
  constructor( private router: Router,
               private fb: FormBuilder,
               private authService: AuthService,
               private ngZone: NgZone,
               public storageService :StorageServiceService ,
               private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   // this.renderButton();
  }

  login() {
  
    this.spinner.show();

    const { email, password } = this.loginForm.value;

    this.authService.login( email, password )
      .subscribe( ok => {

        console.log(email,password);
 

this.responsepass = ok?.error?.errors?.password?.msg || "";
this.responseemail = ok?.error?.errors?.email?.msg || "";
this.responsegeneral = ok?.error?.msg || "";
            




        if ( ok === true ) {


          this.items = this.storageService.getCart();
          if (this.items) {
            this.router.navigateByUrl('/carrito');

          }
          else if (this.items === null){
            this.router.navigateByUrl('/');

          }
          
         }
        else {

          // if (this.loginForm.value.email.trim().length === 0 ) {
          //   Swal.fire('Error', 'El email es obligatorio. ', 'error');

          // }
          // else if (this.loginForm.value.password.trim().length === 0 ){
          //   Swal.fire('Error', 'La contraseña es obligatoria. ', 'error');

          // }
          
          //  Swal.fire('Error', this.responseemail + this.responsepass, 'error');

           Swal.fire({
            title: 'Error',
            icon: 'info',
            html:
          
              this.responseemail + 
              '<br> ' +
              this.responsepass + this.responsegeneral,
        
            focusConfirm: false,
       
          })


        }
      });
      this.spinner.hide();
     
  }


}
