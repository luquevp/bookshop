import { Component, OnInit } from '@angular/core';
import { IPreguntaFrecuente } from '../../interfaces/preguntasfrecuentes.interface';
import { preguntasfrecuentes } from '../../interfaces/preguntas.interface';
import { BusquedasService } from '../../services/busquedas.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-preguntasfrecuentes',
  templateUrl: './preguntasfrecuentes.component.html',
  styleUrls: ['./preguntasfrecuentes.component.scss']
})
export class PreguntasfrecuentesComponent implements OnInit {


  
  public preguntas: preguntasfrecuentes[];



  constructor( private spinner: NgxSpinnerService,
    private busquedasService : BusquedasService) { }

  ngOnInit(): void {
    this.spinner.show();

    this.busquedasService.getPreguntasFrecuentes()
   .subscribe(preguntas => {
     this.preguntas = preguntas;
     this.spinner.hide();

     });

  }



}
