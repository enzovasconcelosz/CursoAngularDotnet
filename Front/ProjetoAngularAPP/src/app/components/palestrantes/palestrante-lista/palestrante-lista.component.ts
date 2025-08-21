import { Component, OnInit } from '@angular/core';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { environment } from '@environ ments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.scss'],
})
export class PalestranteListaComponent implements OnInit {
  public palestrantes: Palestrante[] = [];
  public palestranteId = 0;
  public pagination = {} as Pagination;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  constructor(
    private palestranteService: PalestranteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit() {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;

    this.carregarPalestrantes();
  }

  public carregarPalestrantes(): void {
    this.spinner.show();

    this.palestranteService
      .getPalestrantes(
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe(
        (paginatedResponse: PaginatedResult<Palestrante[]>) => {
          this.palestrantes = paginatedResponse.result;
          this.pagination = paginatedResponse.pagination;
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao carregar os palestrantes.', 'Erro!');
          console.log(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public filtrarPalestrantes(event: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged.pipe(debounceTime(500)).subscribe(() => {
        this.spinner.show();

        this.palestranteService
          .getPalestrantes(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            event.value
          )
          .subscribe(
            (paginatedResponse: PaginatedResult<Palestrante[]>) => {
              this.palestrantes = paginatedResponse.result;
              this.pagination = paginatedResponse.pagination;
            },
            (error: any) => {
              this.spinner.hide();
              this.toastr.error('Erro ao carregar os palestrantes.', 'Erro!');
              console.log(error);
            }
          )
          .add(() => this.spinner.hide());
      });
    }

    this.termoBuscaChanged.next(event.value);
  }

  public getImagemURL(imageName: string): string {
    if (imageName) 
      return environment.apiURL + `resources/perfil/${imageName}`;
    else 
      return `./assets/perfilSemImagem.png`;
  }
}
