import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventoService, BsModalService], //Uma das formas de realizar injeção de dependência pra usar serviços no componente
})
export class EventosComponent implements OnInit {
  ngOnInit(): void {}
}
