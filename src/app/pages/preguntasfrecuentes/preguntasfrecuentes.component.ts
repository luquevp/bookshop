import { Component, OnInit } from '@angular/core';
import { IPreguntaFrecuente } from '../../interfaces/preguntasfrecuentes.interface';
import { preguntasfrecuentes } from '../../interfaces/preguntas.interface';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  selector: 'app-preguntasfrecuentes',
  templateUrl: './preguntasfrecuentes.component.html',
  styleUrls: ['./preguntasfrecuentes.component.scss']
})
export class PreguntasfrecuentesComponent implements OnInit {


  
  public preguntas: preguntasfrecuentes[];



  constructor( private busquedasService : BusquedasService) { }

  ngOnInit(): void {
    this.busquedasService.getPreguntasFrecuentes()
   .subscribe(preguntas => {
     this.preguntas = preguntas;
     console.log(preguntas);
     });
  }

}
