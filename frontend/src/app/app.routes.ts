import { Routes } from '@angular/router';
import { ComienzoComponent } from './components/comienzo/comienzo.component';
import { CreacionComponent } from './components/creacion/creacion.component';

export const routes: Routes = [
  {
    path: '',
    component: ComienzoComponent,
  },
  {
    path: 'creacion',
    component: CreacionComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
