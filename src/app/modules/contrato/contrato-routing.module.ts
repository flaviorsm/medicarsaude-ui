import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@medicar/core';
import { ContratoComponent, ListarContratoComponent, RegistrarContratoComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ContratoComponent,
    children: [
      {
        path: '',
        component: ListarContratoComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar',
        component: RegistrarContratoComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar/:id',
        component: RegistrarContratoComponent,
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
export class ContratoRoutingModule { }
