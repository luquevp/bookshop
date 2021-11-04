import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IItem } from 'src/app/interfaces/item.interface';
import { AuthService } from 'src/app/services/auth.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import Swal from 'sweetalert2';
import { LoginForm } from '../../interfaces/login-form.interface';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {
  recoveryemail = localStorage.getItem('RecoveryMail');

  
  public loginForm = this.fb.group({
    email: [this.recoveryemail || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],

  });

  private destEmail: LoginForm

  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private ngZone: NgZone,
    public storageService: StorageServiceService) { }


  ngOnInit(): void {
  }

  guardarNuevaPass() {

    this.destEmail = this.loginForm.value

    this.authService.restaurarPass(this.destEmail)
      .subscribe(resp => {

        console.log(resp);
        if (resp.ok === true) {
          Swal.fire('Buen Trabajo!', resp.msg, 'success');
          this.router.navigateByUrl(`/login`)

          localStorage.setItem('RecoveryMail', "")



        }
        else{
          Swal.fire('Error!', 'Debe ingresar una contraseña válida.', 'error');

        }


      })


  }



}
