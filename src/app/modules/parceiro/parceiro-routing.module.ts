
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@medicar/core';
import { ListarParceiroComponent, ParceiroComponent, RegistrarParceiroComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ParceiroComponent,
    children: [
      {
        path: '',
        component: ListarParceiroComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR, RoleEnum.CLIENTE]
        },
      },
      {
        path: 'registrar',
        component: RegistrarParceiroComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar/:id',
        component: RegistrarParceiroComponent,
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
export class ParceiroRoutingModule { }
