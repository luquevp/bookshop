import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Recup } from 'src/app/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { StorageServiceService } from '../../services/storage-service.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  public loginForm = this.fb.group({
    destinatario: ['', [Validators.required, Validators.email]],

  });

  private destEmail: Recup

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    public storageService: StorageServiceService,
    private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
  }

  enviarmail() {
    this.spinner.show();


    this.destEmail = this.loginForm.value

    this.authService.solicitarCodRecuperacion(this.destEmail)
      .subscribe(resp => {

        if (resp.ok === true) {
          Swal.fire('Buen Trabajo!', 'El correo fue enviado con éxito!', 'success');
          this.router.navigateByUrl(`/olvidemicontraseña/codigo`)
          localStorage.setItem('RecoveryMail', this.destEmail.destinatario);



        }
        else{
          Swal.fire('Error!', 'Debe ingresar un correo válido.', 'error');

        }
        this.spinner.hide();


      })

   


  }



}
