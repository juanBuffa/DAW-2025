import { CreateOpcionDTO } from './create-opcion.dto';
import { PreguntaDTO } from './pregunta.dto';
export interface CreatePreguntaDTO extends Pick<
  PreguntaDTO,
  'numero' | 'texto' | 'tipo'
>{
  opciones: CreateOpcionDTO[]
}
