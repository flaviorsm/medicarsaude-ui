import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratoComponent, ListarContratoComponent, RegistrarContratoComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ContratoComponent,
    children: [
      {
        path: '',
        component: ListarContratoComponent,
      },
      {
        path: 'registrar',
        component: RegistrarContratoComponent,
      },
      {
        path: 'registrar/:id',
        component: RegistrarContratoComponent,
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
