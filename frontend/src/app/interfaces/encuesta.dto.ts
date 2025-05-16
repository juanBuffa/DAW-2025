import { PreguntaDTO } from './pregunta.dto';

export interface EncuestaDTO {
  id:number

  nombre: string;

  preguntas: PreguntaDTO[];

  codigoRespuesta: string;
}
