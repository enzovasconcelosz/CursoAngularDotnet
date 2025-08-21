import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { environment } from '@environ ments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit {
  modalRef: BsModalRef | undefined;
  public eventos: Evento[] = [];
  public widthImg = 100;
  public marginImg = 20;
  public mostrarImagem = true;
  public eventoId = 0;
  public pagination = {} as Pagination;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public filtrarEventos(event: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged.pipe(debounceTime(500)).subscribe((filtrarPor) => {
        this.spinner.show();

        this.eventoService
          .getEventos(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            event.value
          )
          .subscribe(
            (paginatedResponse: PaginatedResult<Evento[]>) => {
              this.eventos = paginatedResponse.result;
              this.pagination = paginatedResponse.pagination;
            },
            (error: any) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar os eventos.', 'Erro!');
              console.log(error);
            }
          )
          .add(() => this.spinner.hide());
      });
    }

    this.termoBuscaChanged.next(event.value);
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;

    this.carregarEventos();
  }

  public alterarVisibilidadeImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public mostraImagem(imagemURL: string): string {
    return imagemURL !== ''
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : '/assets/semImagem.png';
  }

  public carregarEventos(): void {
    this.spinner.show();

    this.eventoService
      .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (paginatedResponse: PaginatedResult<Evento[]>) => {
          this.eventos = paginatedResponse.result;
          this.pagination = paginatedResponse.pagination;
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os eventos.', 'Erro!');
          console.log(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event?.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService
      .excluirEvento(this.eventoId)
      .subscribe(
        (result: boolean) => {
          if (result) {
            this.toastr.success(
              'O evento foi excluído com sucesso.',
              'Excluído!'
            );
            this.carregarEventos();
          }
        },
        () => this.toastr.error('Erro ao excluir o evento.', 'Erro!')
      )
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

  pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }
}
