import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../interfaces/eventos.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public eventos : Evento[];

  constructor( private eventosService : EventosService) { }

  ngOnInit(): void {
    this.eventosService.getEventos()
   .subscribe(eventos => {
     this.eventos = eventos;
     console.log(eventos);
     });
  }

}
