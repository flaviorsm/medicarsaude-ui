import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SplashScreenComponent } from '@medicar/components';
import { MaskDirective } from './directives';

@NgModule({
  declarations: [
    MaskDirective,
    SplashScreenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ReactiveFormsModule,
    MaskDirective,
    SplashScreenComponent,
  ]
})
export class CoreModule { }
