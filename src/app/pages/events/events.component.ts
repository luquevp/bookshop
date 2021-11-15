import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../interfaces/eventos.interface';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public eventos : Evento[];

  constructor( private eventosService : EventosService, private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.eventosService.getEventos()
   .subscribe(eventos => {
     this.eventos = eventos;
     console.log(eventos);
     });

     
  }

  buscarEvento(termino : string) {
 console.log(termino);

 if(termino.trim().length === 0){
  this.eventosService.getEventos()
  .subscribe(eventos => {
    this.eventos = eventos;
    console.log(eventos);
    });
 }
 else {
  this.busquedasService.buscarEvento(termino.trim())
  .subscribe(eventos => {
 
 if(eventos ){
   this.eventos = eventos;
 } else {
   Swal.fire('Oops..', 'No se encontraron eventos con ese nombre.', 'info' );
 
 }
  });
 }


}

}
