
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarParceiroComponent, ParceiroComponent, RegistrarParceiroComponent } from '.';

const routes: Routes = [
  {
    path: '',
    component: ParceiroComponent,
    children: [
      {
        path: '',
        component: ListarParceiroComponent,
      },
      {
        path: 'registrar',
        component: RegistrarParceiroComponent,
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
