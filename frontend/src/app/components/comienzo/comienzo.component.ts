import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SeccionComponent } from '../seccion/seccion.component';

@Component({
  selector: 'app-comienzo',
  imports: [ButtonModule, RouterModule, SeccionComponent],
  templateUrl: './comienzo.component.html',
  styleUrl: './comienzo.component.css'
})
export class ComienzoComponent {

}
