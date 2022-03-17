import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarVendaComponent } from './listar-venda/listar-venda.component';
import { RegistrarVendaComponent } from './registrar-venda/registrar-venda.component';
import { VendaComponent } from './venda.component';

const routes: Routes = [
  {
    path: '',
    component: VendaComponent,
    children: [
      {
        path: '',
        component: ListarVendaComponent,
      },
      {
        path: 'registrar',
        component: RegistrarVendaComponent,
      },
      {
        path: 'registrar/:id',
        component: RegistrarVendaComponent,
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
