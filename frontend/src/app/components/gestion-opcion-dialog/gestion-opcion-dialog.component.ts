import { Component, effect, inject, input, model, output, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextoErrorComponent } from '../texto-error/texto-error.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-gestion-opcion-dialog',
  imports: [
    DialogModule,
    ReactiveFormsModule,
    FloatLabelModule,
    TextoErrorComponent,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './gestion-opcion-dialog.component.html',
  styleUrl: './gestion-opcion-dialog.component.css',
})
export class GestionOpcionDialogComponent {
  visible = model.required<boolean>();

  agregarOpcion = output<string>();

  form: FormGroup;

  private messageService: MessageService = inject(MessageService);

  constructor() {

    this.form = new FormGroup({
      texto: new FormControl<string>('', Validators.required),
    });

    effect(() => {
      if (this.visible()) {
        this.form.reset();
      }
    });
  }

  get texto(): FormControl<string> {
    return this.form.get('texto') as FormControl<string>;
  }

  agregar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Hay errores en el formulario',
      });
      return;
    }

    const opcion: string = this.form.get('texto')?.value;
    this.agregarOpcion.emit(opcion);
    this.cerrar();
  }

  cerrar() {
    this.visible.set(false);
  }
}
