import { Component, inject, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SeccionComponent } from '../seccion/seccion.component';
import { ButtonModule } from 'primeng/button';
import { GestionPreguntaDialogComponent } from '../gestion-pregunta-dialog/gestion-pregunta-dialog.component';
import { PreguntaDTO } from '../../interfaces/pregunta.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  tiposPreguntaPresentacion,
  TiposRespuestaEnum,
} from '../../enums/tipos-pregunta.enum';
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { EncuestasService } from '../../services/encuestas.service';
import { Router } from '@angular/router';
import { CreateEncuestaDTO } from '../../interfaces/create-encuesta.dto';

@Component({
  selector: 'app-creacion-encuesta',
  imports: [
    InputTextModule,
    FloatLabel,
    FormsModule,
    SeccionComponent,
    ButtonModule,
    GestionPreguntaDialogComponent,
    ReactiveFormsModule,
    TextoErrorComponent,
  ],
  templateUrl: './creacion-encuesta.component.html',
  styleUrl: './creacion-encuesta.component.css',
})
export class CreacionEncuestaComponent {
  form: FormGroup;

  private messageService: MessageService = inject(MessageService);

  private router: Router = inject(Router);

  private confirmationService: ConfirmationService =
    inject(ConfirmationService);

  private encuestasService: EncuestasService = inject(EncuestasService);

  dialogGestionPreguntaVisible = signal<boolean>(false);

  preguntaSeleccionada = signal<PreguntaDTO | null>(null);

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl<string>('', Validators.required),
      preguntas: new FormArray<FormControl<PreguntaDTO>>(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  get preguntas(): FormArray<FormControl<PreguntaDTO>> {
    return this.form.get('preguntas') as FormArray<FormControl<PreguntaDTO>>;
  }

  get nombre(): FormControl<string> {
    return this.form.get('nombre') as FormControl<string>;
  }

  abrirDialog() {
    this.dialogGestionPreguntaVisible.set(true);
  }

  agregarPregunta(pregunta: PreguntaDTO) {
    this.preguntas.push(
      new FormControl<PreguntaDTO>(pregunta) as FormControl<PreguntaDTO>
    );
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  getTipoPreguntaPresentacion(tipo: TiposRespuestaEnum): string {
    return tiposPreguntaPresentacion.find(
      (tipoPresentacion) => tipoPresentacion.tipo === tipo
    )!?.presentacion;
  }

  confirmarCrearEncuesta() {
    this.confirmationService.confirm({
      message: 'Confirmar creación de encuesta?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.crearEncuesta();
      },
    });
  }

  confirmarEliminarPregunta(index: number) {
    this.confirmationService.confirm({
      message: 'Confirmar eliminación?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.eliminarPregunta(index);
      },
    });
  }

  crearEncuesta() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }

    const encuesta: CreateEncuestaDTO = this.form.value;

    for (let i = 0; i < encuesta.preguntas.length; i++) {
      const pregunta = encuesta.preguntas[i];
      pregunta.numero = i + 1;

      if (pregunta.opciones) {
        for (let j = 0; j < pregunta.opciones.length; j++) {
          pregunta.opciones[j].numero = j + 1;
        }
      }
    }

    this.encuestasService.crearEncuesta(encuesta).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'La encuesta se creó con éxito',
        });

        this.router.navigateByUrl(
          '/presentacion-enlaces?id-encuesta=' +
            res.id +
            '&codigo-respuesta=' +
            res.codigoRespuesta +
            '&codigo-resultados=' +
            res.codigoResultados
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ha ocurrido un error al crear la encuesta',
        });
      },
    });
  }
}
