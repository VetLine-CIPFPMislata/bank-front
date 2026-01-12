import { Routes } from '@angular/router';
import { Movimientos } from './components/movimientos/movimientos';
import { Cuentas } from './components/cuentas/cuentas';
import { Inicio } from './components/inicio/inicio';
import { Tarjetas } from './components/tarjetas/tarjetas';
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
        path: 'cuentas',
        component: Cuentas,
        // canActivate: [authGuard]      
    },
    {
        path: 'tarjetas',
        component: Tarjetas,
        // canActivate: [authGuard] 
    },
    {
        path: 'movimientos-bancarios',
        component: Movimientos,
        // canActivate: [authGuard] 
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
