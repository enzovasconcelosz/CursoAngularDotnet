import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-palestrante-detalhe',
  templateUrl: './palestrante-detalhe.component.html',
  styleUrls: ['./palestrante-detalhe.component.scss'],
})
export class PalestranteDetalheComponent implements OnInit {
  public form = {} as FormGroup;
  public situacaoDoForm = '';
  public corDescricao = '';

  constructor(
    private fb: FormBuilder,
    public palestranteService: PalestranteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.validation();
    this.verificaForm();
    this.carregarPalestrante();
  }

  private carregarPalestrante(): void {
    this.spinner.show();

    this.palestranteService.getPalestrante().subscribe(
      (palestrante: Palestrante) => {
        this.form.patchValue(palestrante);
      },
      () => {
        this.toastr.error('Erro ao carregar o palestrante.', 'Erro.');
      }
    );
  }

  private verificaForm(): void {
    this.form.valueChanges
      .pipe(
        map(() => {
          this.situacaoDoForm = 'Mini currículo está sendo atualizado...';
          this.corDescricao = 'text-warning';
        }),
        debounceTime(1000),
        tap(() => this.spinner.show())
      )
      .subscribe(() => {
        this.palestranteService
          .atualizarPalestrante({ ...this.form.value })
          .subscribe(
            () => {
              this.situacaoDoForm = 'Mini currículo foi atualizado!';
              this.corDescricao = 'text-success';

              setTimeout(() => {
                this.situacaoDoForm = 'Mini currículo foi carregado!';
                this.corDescricao = 'text-muted';
              });
            },
            () => {
              this.toastr.error(
                'Erro ao atualizar o mini currículo do palestrante.',
                'Erro.'
              );
            }
          )
          .add(() => this.spinner.hide());
      });
  }

  private validation(): void {
    this.form = this.fb.group({
      miniCurriculo: ['', Validators.required],
    });
  }

  public get f(): any {
    return this.form.controls;
  }
}
