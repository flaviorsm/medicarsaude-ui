import { RegistrarColaboradorComponent } from './registrar-colaborador/registrar-colaborador.component';
import { ListarColaboradorComponent } from './listar-colaborador/listar-colaborador.component';
import { ColaboradorComponent } from './colaborador.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleEnum } from '@medicar/core';

const routes: Routes = [
  {
    path: '',
    component: ColaboradorComponent,
    children: [
      {
        path: '',
        component: ListarColaboradorComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar',
        component: RegistrarColaboradorComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar/:id',
        component: RegistrarColaboradorComponent,
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
export class ColaboradorRoutingModule { }
