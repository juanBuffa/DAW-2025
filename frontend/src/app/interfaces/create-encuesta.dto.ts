import { CreatePreguntaDTO } from './create-pregunta.dto';
import { EncuestaDTO } from './encuesta.dto';

export interface CreateEncuestaDTO extends Pick<EncuestaDTO, 'nombre'>{
  preguntas : CreatePreguntaDTO[];
}
