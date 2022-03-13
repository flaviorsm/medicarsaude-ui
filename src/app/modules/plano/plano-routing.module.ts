import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      },
      {
        path: 'registrar',
        component: RegistrarPlanoComponent,
      },
      {
        path: 'registrar/:id',
        component: RegistrarPlanoComponent,
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
