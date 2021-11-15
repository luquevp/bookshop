import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../interfaces/eventos.interface';
import { BusquedasService } from '../../services/busquedas.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public eventos : Evento[];

  constructor( private spinner: NgxSpinnerService,private eventosService : EventosService, private busquedasService: BusquedasService) { }

  ngOnInit(): void {

    this.spinner.show();

    this.eventosService.getEventos()
   .subscribe(eventos => {
     this.eventos = eventos;
     this.spinner.hide();

     });

     
  }

  buscarEvento(termino : string) {

 if(termino.trim().length === 0){
  this.eventosService.getEventos()
  .subscribe(eventos => {
    this.eventos = eventos;
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
