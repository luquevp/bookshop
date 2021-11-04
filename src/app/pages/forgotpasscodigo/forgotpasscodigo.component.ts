import { Component, NgZone, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Recup } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import Swal from 'sweetalert2';
import { Recup2 } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-forgotpasscodigo',
  templateUrl: './forgotpasscodigo.component.html',
  styleUrls: ['./forgotpasscodigo.component.scss']
})
export class ForgotpasscodigoComponent implements OnInit {
  recoveryemail = localStorage.getItem('RecoveryMail');


  public loginForm = this.fb.group({
    email: [this.recoveryemail || '', [Validators.required, Validators.email]],
    codigo: ['', [Validators.required]],

  });



  private destEmail: Recup2

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    public storageService: StorageServiceService) { }


  ngOnInit(): void {
  }

  enviarcodigo() {

    this.destEmail = this.loginForm.value

    this.authService.enviarCodRecuperacion(this.destEmail)
      .subscribe(resp => {

        console.log(resp);
        if (resp.ok === true) {
          Swal.fire('Buen Trabajo!', 'El codigo fue registrado con éxito!', 'success');
          this.router.navigateByUrl(`/restaurarcontraseña`)


        }
        else{
          Swal.fire('Error!', 'Debe ingresar un código válido.', 'error');

        }


      })


  }

}
