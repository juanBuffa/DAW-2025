import { OpcionDTO } from './opcion.dto';

export type CreateOpcionDTO = Pick<OpcionDTO, 'numero' | 'texto'>;
