import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;
  public idUsuario: string;



  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService,
               private ActivatedRoute: ActivatedRoute) {
    
  }

 
  ngOnInit(): void {

    this.idUsuario = localStorage.getItem('id');
    console.log(this.idUsuario);

    this.ActivatedRoute.params
    .pipe(
      switchMap( ( { id} ) => this.usuarioService.getUsuarioPorId(this.idUsuario))
      )
    .subscribe(usuario => {console.log(usuario);
      this.usuario = usuario;
    })








  }


}
