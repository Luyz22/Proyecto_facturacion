import { Routes } from '@angular/router';
import { AuthGuard } from './modulos/auth/auth.guard';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./modulos/auth/auth.component')},
    {path: 'panel', loadComponent: () => import('./modulos/shared/sidebar/layout.component'), canActivate: [AuthGuard],
        children: [
            {path: 'dashboard', title: 'Dashboard', loadComponent: () => import('./modulos/dashboard/dashboard.component')},
            {path: 'clientes', title: 'Modulo Clientes', loadComponent: () => import('./modulos/clientes/clientes.component')},
            {path: 'facturacion', title: 'Modulo Facturacion', loadComponent: () => import('./modulos/facturacion/facturacion.component')},
            {path: 'usuarios', title: 'Modulo Usuarios', loadComponent: () => import('./modulos/usuarios/usuarios.component')},
        ]
    },
    { path: '', redirectTo: '/login',pathMatch: 'full'}
];