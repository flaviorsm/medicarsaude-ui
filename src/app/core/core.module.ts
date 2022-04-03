import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from '@medicar/components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { MaskDirective } from './directives';
import { FilterPipe } from './shared/filter.pipe';
import { SortPipe } from './shared/sort.pipe';

export const options = {} as Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaskDirective,
    SplashScreenComponent,
    FilterPipe,
    NgxMaskModule,
    NgbModule,
    SortPipe,
    ToastrModule,
  ]
})
export class CoreModule { }
