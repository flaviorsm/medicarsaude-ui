import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'venda',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/venda/venda.module').then((m) => m.VendaModule),
  },
  {
    path: 'cliente',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/cliente/cliente.module').then((m) => m.ClienteModule),
  },
  {
    path: 'plano',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/plano/plano.module').then((m) => m.PlanoModule),
  },
  {
    path: 'colaborador',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/colaborador/colaborador.module').then((m) => m.ColaboradorModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
