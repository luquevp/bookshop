import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { BusquedasService } from '../../services/busquedas.service';
import { ComprobanteConDetalle, Detalle } from '../../interfaces/comprobante.interface';
import { numberFormat } from 'highcharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';



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
  public comprobantes : ComprobanteConDetalle[] = [];
  public detalleComprobante : Detalle;
  public comprobante: ComprobanteConDetalle;
  public precioPorUnidad : number;
  public numeroComprobante: number;



  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService,
               private spinner: NgxSpinnerService,
               private ActivatedRoute: ActivatedRoute,
               private busquedasService: BusquedasService) {
    
  }

 
  ngOnInit(): void {
    this.spinner.show();


    this.idUsuario = localStorage.getItem('id');
    console.log(this.idUsuario);

    this.ActivatedRoute.params
    .pipe(
      switchMap( ( { id} ) => this.usuarioService.getUsuarioPorId(this.idUsuario))
      )
    .subscribe(usuario => {console.log(usuario);
      this.usuario = usuario;
    })

    console.log(this.idUsuario);

    this.ActivatedRoute.params
    .pipe(
      switchMap( ( { termino } ) => this.busquedasService.getComprobantesPorUsuario(this.idUsuario))
      )
    .subscribe((comprobantes: any) => {console.log(comprobantes);
      this.comprobantes = comprobantes
   })

   this.spinner.hide();

  }

  traerDetalleComprobante(numero : number){

    this.numeroComprobante = numero;
    this.busquedasService.getDetallePorNumeroComprobante(numero)
    .subscribe(detalle => {
      this.detalleComprobante = detalle;
      
        
      });


      this.busquedasService.getComprobantePorNumero(numero)
    .subscribe(comprobante => {
      this.comprobante = comprobante[0];
      
        
      });
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
