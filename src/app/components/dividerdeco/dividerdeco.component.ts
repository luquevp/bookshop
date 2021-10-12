import { Component, OnInit, Input } from '@angular/core';
import { faQuestionCircle, faShippingFast, faSprayCan, faWallet } from '@fortawesome/free-solid-svg-icons';
import { IDivider } from '../../interfaces/dividers.interface';


@Component({
  selector: 'app-dividerdeco',
  templateUrl: './dividerdeco.component.html',
  styleUrls: ['./dividerdeco.component.scss']
})
export class DividerdecoComponent implements OnInit {

  @Input() divider: IDivider;
  


  public dividers: Array<IDivider> = [{
    
      id: 2,
      icon: faQuestionCircle,
      title: 'Hace todas tus consultas',
      content: 'en nuestras redes sociales.',
    },
    {
    id: 0,
    icon: faShippingFast,
    title: 'Hacemos envíos a todo el país.',
    content: 'Bajo Protocolo COVID-19.',
  },
  {
    id: 1,
    icon: faWallet,
    title: 'Recibimos todas las tarjetas',
    content: 'Debito y Credito.',
  },
  

];


  constructor() { }

  ngOnInit(): void {
  }

}
