import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@medicar/core';
import { ListarPlanoComponent, RegistrarPlanoComponent } from '.';
import { PlanoComponent } from './plano.component';

const routes: Routes = [
  {
    path: '',
    component: PlanoComponent,
    children: [
      {
        path: '',
        component: ListarPlanoComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR, RoleEnum.CLIENTE]
        },
      },
      {
        path: 'registrar',
        component: RegistrarPlanoComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        },
      },
      {
        path: 'registrar/:id',
        component: RegistrarPlanoComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        },
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
export class PlanoRoutingModule { }
