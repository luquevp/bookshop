import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, AbstractControlOptions } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import { Provincia } from '../../interfaces/provincia.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  
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
    celular: ['', Validators.compose([Validators.required, Validators.minLength(12)])],





  }, {
    validators: this.passwordsIguales('password', 'password2')
  }as AbstractControlOptions);

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    ) {
      
     }

    
     ngOnInit(){
      this.auth.getProvincias()
      .subscribe(provincias => {
        this.provincias = provincias;
        console.log(this.provincias);
     })
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
        

          Swal.fire('Error', 'Debe completar los campos obligatorios correctamente.', 'error');
        }
      }
      );

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
      } else {
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
