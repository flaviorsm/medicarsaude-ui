import { RegistrarComponent } from './registrar/registrar.component';
import { ListaComponent } from './listar/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendaComponent } from './venda.component';

const routes: Routes = [
  {
    path: '',
    component: VendaComponent,
    children: [
      {
        path: '',
        component: ListaComponent,
      },
      {
        path: 'registrar',
        component: RegistrarComponent,
      },
      {
        path: 'registrar/:id',
        component: RegistrarComponent,
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
export class VendaRoutingModule { }
