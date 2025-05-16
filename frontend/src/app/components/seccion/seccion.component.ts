import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-seccion',
  imports: [],
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css',
})
export class SeccionComponent {
  
  minWidth = input<string>('40vw');
  maxWidth = input<string>('70vw');
  leftMargin = input<string>('15vw');
  rightMargin = input<string>('15vw');

  style = computed(() => {
    return {
      'min-width': this.minWidth(),
      'max-width': this.maxWidth(),
      'margin-left': this.leftMargin(),
      'margin-right': this.rightMargin(),
    };
  });
}
