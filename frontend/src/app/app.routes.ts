import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionEncuestaComponent } from './components/creacion-encuesta/creacion-encuesta.component';

export const routes: Routes = [
  {
    path: '',
    component: ComienzoComponent,
  },
  {
    path: 'creacion',
    component: CreacionEncuestaComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
