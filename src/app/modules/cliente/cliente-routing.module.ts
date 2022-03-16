import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent, ListarClienteComponent, RegistrarClienteComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      {
        path: '',
        component: ListarClienteComponent,
      },
      {
        path: 'registrar',
        component: RegistrarClienteComponent,
      },
      {
        path: 'registrar/:id',
        component: RegistrarClienteComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
