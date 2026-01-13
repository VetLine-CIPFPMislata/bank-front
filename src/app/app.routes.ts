import { Routes } from '@angular/router';
import { DetailCuentaComponent } from './components/detail-cuenta/detail-cuenta';
import { Inicio } from './components/inicio/inicio';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: Inicio,
        // canActivate: [authGuard]
    },
    {
        path: 'detail-cuenta',
        component: DetailCuentaComponent,
        // canActivate: [authGuard]      
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
