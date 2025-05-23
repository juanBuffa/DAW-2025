import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { TiposRespuestaEnum } from '../enums/tipos-pregunta.enum';
import { OpcionDTO } from '../interfaces/opcion.dto';

export const opcionesNoVacias: ValidatorFn = (
  formGroup: AbstractControl,
): ValidationErrors | null => {
  const group = formGroup as FormGroup;
  const controlTipo = group.get('tipo');
  const controlOpciones = group.get('opciones');

  if (!controlTipo?.value || !controlOpciones?.value) {
    return null;
  }

  if (
    esMultipleChoice(controlTipo.value) &&
    !tieneItems(controlOpciones.value)
  ) {
    return { opcionesRequeridas: true };
  }

  return null;
};

function esMultipleChoice(tipo: TiposRespuestaEnum): boolean {
  return [
    TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_MULTIPLE,
    TiposRespuestaEnum.OPCION_MULTIPLE_SELECCION_SIMPLE,
  ].includes(tipo);
}

function tieneItems(array: FormControl<OpcionDTO>[]): boolean {
  return array.length > 0;
}
