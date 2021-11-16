import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, AbstractControlOptions } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Provincia } from '../../interfaces/provincia.interface';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  public contraseñaNoEsIgual = false;
  public formSubmitted = false;
  public provincias : Provincia[];

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [true, Validators.required],
    rol: ["USER_ROLE"],
    provincia: ['', Validators.required],
    localidad: ['', Validators.required],
    direccion: ['', Validators.required],
    codigoPostal: ['', Validators.required],
    celular: ['', Validators.compose([Validators.required, Validators.minLength(10)])],





  }, {
    validators: this.passwordsIguales('password', 'password2')
  }as AbstractControlOptions);

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
    ) {
      
     }

    
     ngOnInit(){
      this.spinner.show();

      this.auth.getProvincias()
      .subscribe(provincias => {
        this.provincias = provincias;
        console.log(this.provincias);
     })

           this.spinner.hide();

    }
     

  // crearUsuario() {
  //   this.formSubmitted = true;
  //   console.log( this.registerForm.value );

  //   if ( this.registerForm.invalid ) {
  //     return;
  //   }

  //   // Realizar el posteo
  //   this.usuarioService.crearUsuario( this.registerForm.value )
  //       .subscribe( resp => {

  //         // Navegar al Dashboard
  //         this.router.navigateByUrl('/');

  //       }, (err) => {
  //         // Si sucede un error
  //         Swal.fire('Error', err.error.msg, 'error' );
  //       });


  // }
  crearUsuario() {
    this.formSubmitted = true;

    
    const { nombre, email, password, rol, provincia, localidad, direccion, codigoPostal, celular } = this.registerForm.value;
    console.log(this.registerForm.value);

    if (this.registerForm.value.nombre.trim().length === 0 ||  this.registerForm.value.password.trim().length === 0 || this.registerForm.value.email.trim().length === 0 ||
       this.registerForm.value.localidad.trim().length === 0 || this.registerForm.value.provincia.trim().length === 0 || this.registerForm.value.direccion.trim().length === 0 || this.registerForm.value.password2.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {

      if (this.registerForm.value.codigoPostal?.toString().length !== 4) {
        Swal.fire('Error', 'Codigo postal inválido. Ej: 4107', 'error')
      } else if (this.registerForm.value.celular?.toString().trim().length !== 10) {
        Swal.fire('Error', 'Celular ingresado inválido. Ej: 543813025984', 'error')
      }else if(this.contraseñaNoEsIgual === true) {
        Swal.fire('Error', 'Las contraseñas deben ser iguales.', 'error')

      }
       else {
        this.auth.registro(nombre, email, password, rol, provincia,
          localidad,
          direccion,
          codigoPostal,
          celular)
          .subscribe(ok => {
    
            if (ok === true) {
              console.log(ok);
    
              Swal.fire('Buen Trabajo!', 'El usuario fue creado correctamente.', 'success');
    
              this.router.navigateByUrl('/login');
            } else {
              console.log(ok);
            
    
              Swal.fire('Error', 'El email ingresado ya existe o es inválido. Ej: thebookshop@gmail.com', 'error');
            }
          }
          );
      }
    }


    

  }

  campoNoValido(campo: string): boolean {

    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }


  

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {

      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
        this.contraseñaNoEsIgual = false;

      } else {
        this.contraseñaNoEsIgual = true;

        pass2Control.setErrors({ noEsIgual: true })
      }


    }
  }


  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9- ]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9- ]/g, "");
      // invalid character, prevent input

    }
  }

  public inputValidatorSinNumero(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z- ]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z- ]/g, "");
      // invalid character, prevent input

    }
  }
}
