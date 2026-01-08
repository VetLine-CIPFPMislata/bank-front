import { Routes } from '@angular/router';
import { Movimientos } from './components/movimientos/movimientos';
import { Cuentas } from './components/cuentas/cuentas';
import { Inicio } from './components/inicio/inicio';
import { Tarjetas } from './components/tarjetas/tarjetas';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Inicio,
    },
    {
        path: 'cuentas',
        component: Cuentas,
    },
    {
        path: 'tarjetas',
        component: Tarjetas,
    },
    {
        path: 'movimientos-bancarios',
        component: Movimientos,
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
