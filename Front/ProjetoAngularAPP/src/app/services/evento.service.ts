import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { map, take } from 'rxjs/operators';
import { environment } from '@environ ments/environment';
import { PaginatedResult } from '@app/models/Pagination';

@Injectable({
  providedIn: 'root', //Uma das formas de realizar injeção de dependência pra usar serviços no componente
})
export class EventoService {
  constructor(private http: HttpClient) {}

  private baseURL = environment.apiURL + 'api/eventos';

  public getEventos(
    page?: number,
    itemsPerPage?: number,
    term?: string
  ): Observable<PaginatedResult<Evento[]>> {
    const paginatedResult: PaginatedResult<Evento[]> = new PaginatedResult<
      Evento[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '') 
      params = params.append('term', term);

    return this.http
      .get<Evento[]>(this.baseURL, { observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          paginatedResult.result = response.body;

          if (response.headers.has('Pagination'))
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );

          return paginatedResult;
        })
      );
  }

  public getEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  public cadastrarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseURL, evento).pipe(take(1));
  }

  public atualizarEvento(evento: Evento): Observable<Evento> {
    return this.http
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
      .pipe(take(1));
  }

  public excluirEvento(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}/${id}`).pipe(take(1));
  }

  postUpload(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();

    formData.append('file', fileToUpload);

    return this.http
      .post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData)
      .pipe(take(1));
  }
}
