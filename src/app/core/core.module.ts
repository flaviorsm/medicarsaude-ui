import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from '@medicar/components';
import { MaskDirective } from './directives';
import { FilterPipe } from './shared/filter.pipe';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options = {} as Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaskDirective,
    SplashScreenComponent,
    FilterPipe,
    NgxMaskModule,
  ]
})
export class CoreModule { }
