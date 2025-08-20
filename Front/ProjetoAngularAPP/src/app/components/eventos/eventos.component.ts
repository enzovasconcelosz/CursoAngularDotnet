import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  providers: [EventoService, BsModalService], //Uma das formas de realizar injeção de dependência pra usar serviços no componente
})
export class EventosComponent implements OnInit {
  ngOnInit(): void {}
}
