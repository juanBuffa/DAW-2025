import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateEncuestaDTO } from '../interfaces/create-encuesta.dto';
import { Observable } from 'rxjs';
import { CodigoTipoEnum } from '../enums/codigo-tipo.enum';
import { EncuestaDTO } from '../interfaces/encuesta.dto';

@Injectable({ providedIn: 'root' })
export class EncuestasService {
  private httpClient = inject(HttpClient);

  crearEncuesta(dto: CreateEncuestaDTO): Observable<{
    id: number;
    codigoRespuesta: string;
    codigoResultados: string;
  }> {
    return this.httpClient.post<{
      id: number;
      codigoRespuesta: string;
      codigoResultados: string;
    }>('/api/v1/encuestas', dto);
  }

  traerEncuesta(
    idEncuesta: number,
    codigo: string,
    tipo: CodigoTipoEnum,
  ): Observable<EncuestaDTO> {
    return this.httpClient.get<EncuestaDTO>(
      '/api/v1/encuestas/' + idEncuesta + '?codigo=' + codigo + '&tipo=' + tipo,
    );
  }

  test() {
    this.traerEncuesta(1, 'codigo-test', CodigoTipoEnum.RESPUESTA).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
