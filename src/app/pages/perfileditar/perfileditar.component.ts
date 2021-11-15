import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Role, Usuario } from '../../interfaces/usuario.interface';
import { Provincia } from '../../interfaces/provincia.interface';
import { FileUploadService } from '../../services/file-upload.service';
import { UsuarioService } from '../../services/usuario.service';
import {  faPencilAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-perfileditar',
  templateUrl: './perfileditar.component.html',
  styleUrls: ['./perfileditar.component.scss']
})
export class PerfileditarComponent implements OnInit {

  faPencilAlt = faPencilAlt;

  public idUsuario: string;

  Roles = [
    {
      id: 'ADMIN_ROLE',
      desc: 'ADMIN'
    },
    {
      id: 'USER_ROLE',
      desc: 'USER'
    }
  ]

  usuario: Usuario = {
    ok: false,
    nombre: '',
    email: '',
    img: '',
    password: '',
    rol: Role.USER_ROLE,
    estado: true,
    google: true,
    provincia: '',
    codigoPostal: undefined,
    localidad: '',
    celular: undefined,
    direccion: ''
  }

  provincias: Provincia[] = []

  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileUploadService: FileUploadService,
     private auth: AuthService,
  ) { }

  ngOnInit(): void {

    this.idUsuario = localStorage.getItem('id');

    
    this.getProvincias()

    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usuarioService.getUsuarioPorId(this.idUsuario))
      )
      .subscribe(usuario => this.usuario = usuario)
  }

  getProvincias() {
    this.auth.getProvincias()
      .subscribe(provincias => {
        this.provincias = provincias
      })
  }

  cambiarImagen(event: any): any {
    this.imagenSubir = event.target.files[0];

    console.log(event.target.files[0])
    if (!event.target.files[0]) { return }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z ]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid);
    Swal.fire('Imagen cargada correctamente', `usuario: ${this.usuario.nombre}`, 'success')
  }

  guardar() {
    if (this.usuario.password === undefined) {

      Swal.fire('Error', 'Por favor ingrese su contraseÃ±a', 'error')

    } else if (this.usuario.nombre.trim().length === 0 || this.usuario.password.trim().length === 0 || this.usuario.email.trim().length === 0
      || this.usuario.localidad.trim().length === 0 || this.usuario.provincia.trim().length === 0 || this.usuario.direccion.trim().length === 0) {

      Swal.fire('Error', 'Campos obligatorios vacios', 'error')

    } else {

      this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe(ok => {
          if (ok === true) {
            Swal.fire('Usuario modificado correctamente', this.usuario.nombre, 'success')
            this.router.navigate(['/gestion/usuario'])
          } else {
            Swal.fire('Error', ok, 'error')
          }
        })
    }
  }

}