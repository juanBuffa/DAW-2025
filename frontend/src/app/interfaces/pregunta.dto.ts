import { TiposRespuestaEnum } from '../enums/tipos-pregunta.enum';
import { OpcionDTO } from './opcion.dto';

export interface PreguntaDTO {
  id: number;

  numero: number;

  texto: string;

  tipo: TiposRespuestaEnum;

  opciones?: OpcionDTO[];
}
