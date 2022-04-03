import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { RoleEnum } from '@medicar/core';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: '',
        component: ListarUsuarioComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar',
        component: RegistrarUsuarioComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR]
        }
      },
      {
        path: 'registrar/:id',
        component: RegistrarUsuarioComponent,
        data: {
          roles: [RoleEnum.ADMINISTRADOR, RoleEnum.COLABORADOR, RoleEnum.CLIENTE]
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
export class UsuarioRoutingModule { }
