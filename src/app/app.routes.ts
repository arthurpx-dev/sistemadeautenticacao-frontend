import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: CadastroComponent,
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard],
  },
];
