import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@medicar/core';
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
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar',
        component: RegistrarVendaComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar/:id',
        component: RegistrarVendaComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
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
