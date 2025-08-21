import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Lote } from '@app/models/Lote';
import { LoteService } from '@app/services/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '@environ ments/environment';

@Component({
  selector: 'app-evento-detalhes',
  templateUrl: './evento-detalhes.component.html',
  styleUrls: ['./evento-detalhes.component.scss'],
})
export class EventoDetalhesComponent implements OnInit {
  form = {} as FormGroup;
  evento = {} as Evento;
  private atualizar = false;
  eventoId = 0;
  modalRef: BsModalRef;
  loteAtual = { id: 0, nome: '', indice: 0 };
  imagemURL = 'assets/upload.png';
  file = {} as File;

  get modoEditar(): boolean {
    return this.atualizar;
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  get bsConfigLote(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default',
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private loteService: LoteService,
    private modalService: BsModalService
  ) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();
      this.atualizar = this.eventoId !== null;

      this.eventoService.getEvento(this.eventoId).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.form.patchValue(this.evento);

          if (this.evento.imagemURL !== '') {
            this.imagemURL =
              environment.apiURL + 'resources/images/' + this.evento.imagemURL;
          }

          this.carregarLotes();
        },
        () => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar evento.', 'Erro!');
        },
        () => this.spinner.hide()
      );
    }
  }

  private carregarLotes(): void {
    this.loteService
      .getLotesByEventoId(this.eventoId)
      .subscribe(
        (lotesRetorno: Lote[]) => {
          lotesRetorno.forEach((loteRetorno) => {
            this.lotes.push(this.criarLote(loteRetorno));
          });
        },
        (error: any) => {
          this.toastr.error('Erro ao carregar lotes.', 'Erro');
          console.log(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  private validation(): void {
    this.form = this.fb.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      local: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      dataEvento: ['', Validators.required],
      quantidadePessoas: [
        '',
        [Validators.required, Validators.max(3000), Validators.min(1)],
      ],
      telefone: ['', Validators.required],
      emailPrincipal: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([]),
    });
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim],
      quantidade: [lote.quantidade, Validators.required],
    });
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string {
    return nome === null || nome === '' ? 'Nome do lote' : nome;
  }

  public limparFormulario(): void {
    this.form.reset();
  }

  public cssValidator(campo: FormControl | AbstractControl | null): any {
    return { 'is-invalid': campo?.errors && campo?.touched };
  }

  public salvarEvento(): void {
    this.spinner.show();

    if (this.form.valid) {
      const metodoHttp = !this.atualizar
        ? 'cadastrarEvento'
        : 'atualizarEvento';

      this.evento = !this.atualizar
        ? { ...this.form.value }
        : { id: this.evento.id, ...this.form.value };

      this.eventoService[metodoHttp](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toastr.success(
            `O evento foi ${
              !this.atualizar ? 'salvo' : 'atualizado'
            } com sucesso!`,
            `Sucesso ao ${!this.atualizar ? 'salvar' : 'atualizar'}!`
          );

          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
        },
        () => {
          this.spinner.hide();
          this.toastr.error(
            `Erro ao ${!this.atualizar ? 'salvar' : 'atualizar'} o evento.`,
            'Erro!'
          );
        },
        () => this.spinner.hide()
      );
    }
  }

  public salvarLotes(): void {
    this.spinner.show();

    if (this.form.controls.lotes.valid) {
      this.loteService
        .saveLote(this.eventoId, this.form.value.lotes)
        .subscribe(
          () => {
            this.toastr.success(
              'Os lotes foram salvos com sucesso!',
              'Sucesso!'
            );
            this.lotes.reset();
          },
          () => this.toastr.error('Erro ao cadastrar os lotes.', 'Erro.')
        )
        .add(() => this.spinner.hide());
    }
  }

  public removerLote(template: TemplateRef<any>, indice: number): void {
    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmarExclusaoLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService
      .excluirLote(this.eventoId, this.loteAtual.id)
      .subscribe(
        () => {
          this.toastr.success('O lote foi excluído com sucesso!', 'Sucesso!');
          this.lotes.removeAt(this.loteAtual.indice);
        },
        () => this.toastr.error('Erro ao excluir o lote.', 'Erro.')
      )
      .add(() => this.spinner.hide());
  }

  declinarExclusaoLote(): void {
    this.modalRef.hide();
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemURL = event.target.result);

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.spinner.show();

    this.eventoService
      .postUpload(this.eventoId, this.file)
      .subscribe(
        () => {
          this.carregarEvento();
          this.toastr.success(
            'Upload da imagem realizado com sucesso!',
            'Sucesso!'
          );
        },
        () => this.toastr.error('Erro ao realizar upload da imagem.', 'Erro.')
      )
      .add(() => this.spinner.hide());
  }
}
