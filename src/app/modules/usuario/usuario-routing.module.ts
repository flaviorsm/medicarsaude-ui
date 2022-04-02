import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: '',
        component: ListarUsuarioComponent,
      },
      {
        path: 'registrar',
        component: RegistrarUsuarioComponent,
      },
      {
        path: 'registrar/:id',
        component: RegistrarUsuarioComponent,
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
